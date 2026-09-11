import type { Request, Response } from "express";

import { paginatedResponse, successResponse } from "../http/response.js";
import type {
  CreateProductBody,
  ListProductsQuery,
  ProductIdParams,
  UpdateProductBody,
} from "../schemas/productSchemas.js";
import type { ProductServiceContract } from "../services/productService.js";
import { ProductService } from "../services/productService.js";
import type { UploadedImage } from "../services/imageStorage.js";

export class ProductController {
  constructor(private readonly service: ProductServiceContract = new ProductService()) {}

  async list(request: Request, response: Response): Promise<void> {
    const query = response.locals.validatedQuery as ListProductsQuery;
    const result = await this.service.list(query);
    response.json(paginatedResponse(result.products, result.meta));
  }

  async getById(request: Request, response: Response): Promise<void> {
    const product = await this.service.getById(this.getProductId(response));
    response.json(successResponse(product));
  }

  async create(request: Request, response: Response): Promise<void> {
    const product = await this.service.create(request.body as CreateProductBody);
    response.status(201).json(successResponse(product));
  }

  async update(request: Request, response: Response): Promise<void> {
    const product = await this.service.update(
      this.getProductId(response),
      request.body as UpdateProductBody,
    );
    response.json(successResponse(product));
  }

  async uploadImage(request: Request, response: Response): Promise<void> {
    const file = request.file;
    const uploadedImage: UploadedImage | undefined = file
      ? {
          buffer: file.buffer,
          mimetype: file.mimetype,
          originalname: file.originalname,
          size: file.size,
        }
      : undefined;
    const product = await this.service.uploadImage(this.getProductId(response), uploadedImage);

    response.json(successResponse(product));
  }

  async delete(request: Request, response: Response): Promise<void> {
    await this.service.delete(this.getProductId(response));
    response.status(204).send();
  }

  private getProductId(response: Response): string {
    return (response.locals.validatedParams as ProductIdParams).id;
  }
}
