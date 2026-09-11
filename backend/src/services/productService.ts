import type { Prisma, Product } from "../generated/prisma/client.js";
import { AppError } from "../errors/AppError.js";
import type {
  CreateProductBody,
  ListProductsQuery,
  UpdateProductBody,
} from "../schemas/productSchemas.js";
import type { ProductListMeta, ProductResponse } from "../types/product.js";
import type { ProductRepository } from "../repositories/productRepository.js";
import { productRepository } from "../repositories/productRepository.js";
import type { ImageStorage, UploadedImage } from "./imageStorage.js";
import { imageStorage as defaultImageStorage } from "./imageStorage.js";
import { toProductResponse } from "./productMapper.js";

export type ProductListResult = {
  products: ProductResponse[];
  meta: ProductListMeta;
};

export interface ProductServiceContract {
  create(input: CreateProductBody): Promise<ProductResponse>;
  list(query: ListProductsQuery): Promise<ProductListResult>;
  getById(id: string): Promise<ProductResponse>;
  update(id: string, input: UpdateProductBody): Promise<ProductResponse>;
  uploadImage(id: string, file?: UploadedImage): Promise<ProductResponse>;
  delete(id: string): Promise<void>;
}

export class ProductService implements ProductServiceContract {
  constructor(
    private readonly repository: ProductRepository = productRepository,
    private readonly storage: ImageStorage = defaultImageStorage,
  ) {}

  async create(input: CreateProductBody): Promise<ProductResponse> {
    const product = await this.repository.create({
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      stock: input.stock,
      category: input.category ?? null,
    });

    return toProductResponse(product);
  }

  async list(query: ListProductsQuery): Promise<ProductListResult> {
    const where: Prisma.ProductWhereInput = {};

    if (query.search) {
      where.name = { contains: query.search };
    }

    if (query.category) {
      where.category = { equals: query.category };
    }

    const orderBy = {
      [query.sortBy]: query.sortOrder,
    } as Prisma.ProductOrderByWithRelationInput;

    const skip = (query.page - 1) * query.limit;
    const { products, totalItems } = await this.repository.findMany({
      where,
      orderBy,
      skip,
      take: query.limit,
    });

    return {
      products: products.map(toProductResponse),
      meta: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages: Math.ceil(totalItems / query.limit),
      },
    };
  }

  async getById(id: string): Promise<ProductResponse> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404, "NOT_FOUND");
    }

    return toProductResponse(product);
  }

  async update(id: string, input: UpdateProductBody): Promise<ProductResponse> {
    await this.ensureExists(id);

    const data: Prisma.ProductUpdateInput = {};

    if (input.name !== undefined) data.name = input.name;
    if (input.description !== undefined) data.description = input.description;
    if (input.price !== undefined) data.price = input.price;
    if (input.stock !== undefined) data.stock = input.stock;
    if (input.category !== undefined) data.category = input.category;

    const product = await this.repository.update(id, data);
    return toProductResponse(product);
  }

  async uploadImage(id: string, file?: UploadedImage): Promise<ProductResponse> {
    if (!file) {
      throw new AppError("Image file is required", 400, "INVALID_IMAGE");
    }

    const existingProduct = await this.ensureExists(id);
    const storedImage = await this.storage.save(file);
    let updatedProduct: Product;

    try {
      updatedProduct = await this.repository.update(id, {
        imageUrl: storedImage.imageUrl,
      });
    } catch (error) {
      await this.deleteStoredImageSafely(storedImage.imageUrl);
      throw error;
    }

    await this.deleteStoredImageSafely(existingProduct.imageUrl);
    return toProductResponse(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    const product = await this.ensureExists(id);
    await this.repository.delete(id);
    await this.deleteStoredImageSafely(product.imageUrl);
  }

  private async ensureExists(id: string): Promise<Product> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404, "NOT_FOUND");
    }

    return product;
  }

  private async deleteStoredImageSafely(imageUrl: string | null): Promise<void> {
    try {
      await this.storage.deleteByUrl(imageUrl);
    } catch (error) {
      console.warn("Unable to clean up product image", { imageUrl, error });
    }
  }
}
