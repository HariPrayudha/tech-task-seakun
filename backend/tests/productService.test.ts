import { describe, expect, it } from "vitest";

import { Prisma, type Product } from "../src/generated/prisma/client.js";
import type { ProductListArgs, ProductRepository } from "../src/repositories/productRepository.js";
import type { ListProductsQuery } from "../src/schemas/productSchemas.js";
import { ProductService } from "../src/services/productService.js";

const product: Product = {
  id: "8b7e3e1a-15c8-4f17-bf0d-7c4048c5a90e",
  name: "Keyboard",
  description: "Mechanical keyboard",
  price: new Prisma.Decimal("750000.00"),
  stock: 12,
  category: "Accessories",
  imageUrl: null,
  createdAt: new Date("2026-09-11T00:00:00.000Z"),
  updatedAt: new Date("2026-09-11T00:00:00.000Z"),
};

class FakeProductRepository implements ProductRepository {
  public lastListArgs: ProductListArgs | undefined;
  public product: Product | null = product;

  async create(): Promise<Product> {
    return product;
  }

  async findById(): Promise<Product | null> {
    return this.product;
  }

  async findMany(args: ProductListArgs): Promise<{ products: Product[]; totalItems: number }> {
    this.lastListArgs = args;
    return { products: [product], totalItems: 11 };
  }

  async update(): Promise<Product> {
    return product;
  }

  async delete(): Promise<void> {}
}

describe("ProductService", () => {
  it("builds filtered, sorted, and paginated repository arguments", async () => {
    const repository = new FakeProductRepository();
    const service = new ProductService(repository);
    const query: ListProductsQuery = {
      page: 2,
      limit: 5,
      search: "keyboard",
      category: "Accessories",
      sortBy: "price",
      sortOrder: "asc",
    };

    const result = await service.list(query);

    expect(repository.lastListArgs).toEqual({
      where: {
        name: { contains: "keyboard" },
        category: { equals: "Accessories" },
      },
      orderBy: { price: "asc" },
      skip: 5,
      take: 5,
    });
    expect(result.meta).toEqual({
      page: 2,
      limit: 5,
      totalItems: 11,
      totalPages: 3,
    });
    expect(result.products[0]?.price).toBe(750000);
  });

  it("raises a typed not-found error when a product does not exist", async () => {
    const repository = new FakeProductRepository();
    repository.product = null;
    const service = new ProductService(repository);

    await expect(service.getById("8b7e3e1a-15c8-4f17-bf0d-7c4048c5a90e")).rejects.toMatchObject({
      statusCode: 404,
      code: "NOT_FOUND",
    });
  });
});
