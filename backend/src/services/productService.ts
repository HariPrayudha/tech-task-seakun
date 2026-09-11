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
  delete(id: string): Promise<void>;
}

export class ProductService implements ProductServiceContract {
  constructor(private readonly repository: ProductRepository = productRepository) {}

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

  async delete(id: string): Promise<void> {
    await this.ensureExists(id);
    await this.repository.delete(id);
  }

  private async ensureExists(id: string): Promise<Product> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404, "NOT_FOUND");
    }

    return product;
  }
}
