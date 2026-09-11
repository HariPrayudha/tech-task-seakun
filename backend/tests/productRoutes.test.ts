import request from "supertest";
import { describe, expect, it, vi } from "vitest";

import { createApp } from "../src/app.js";
import { ProductController } from "../src/controllers/productController.js";
import { AppError } from "../src/errors/AppError.js";
import { createProductRouter } from "../src/routes/productRoutes.js";
import type { ProductServiceContract } from "../src/services/productService.js";
import type { ProductListResult } from "../src/services/productService.js";
import type { ProductResponse } from "../src/types/product.js";

const product: ProductResponse = {
  id: "8b7e3e1a-15c8-4f17-bf0d-7c4048c5a90e",
  name: "Keyboard",
  description: "Mechanical keyboard",
  price: 750000,
  stock: 12,
  category: "Accessories",
  imageUrl: null,
  createdAt: "2026-09-11T00:00:00.000Z",
  updatedAt: "2026-09-11T00:00:00.000Z",
};

const listResult: ProductListResult = {
  products: [product],
  meta: {
    page: 1,
    limit: 10,
    totalItems: 1,
    totalPages: 1,
  },
};

const createFakeService = (): ProductServiceContract => ({
  create: vi.fn(async () => product),
  list: vi.fn(async () => listResult),
  getById: vi.fn(async () => product),
  update: vi.fn(async () => product),
  delete: vi.fn(async () => undefined),
});

const createTestApp = (service: ProductServiceContract) =>
  createApp(createProductRouter(new ProductController(service)));

describe("product routes", () => {
  it("creates a product with a 201 response", async () => {
    const service = createFakeService();
    const response = await request(createTestApp(service)).post("/products").send({
      name: "Keyboard",
      description: "Mechanical keyboard",
      price: 750000,
      stock: 12,
      category: "Accessories",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, data: product });
    expect(service.create).toHaveBeenCalledOnce();
  });

  it("returns validation errors for invalid product data", async () => {
    const response = await request(createTestApp(createFakeService()))
      .post("/products")
      .send({ name: "", price: -1, stock: -2 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns paginated products", async () => {
    const service = createFakeService();
    const response = await request(createTestApp(service)).get(
      "/products?page=1&limit=10&sortBy=name&sortOrder=asc",
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [product],
      meta: listResult.meta,
    });
    expect(service.list).toHaveBeenCalledOnce();
  });

  it("returns 404 when the service cannot find a product", async () => {
    const service = createFakeService();
    vi.mocked(service.getById).mockRejectedValue(
      new AppError("Product not found", 404, "NOT_FOUND"),
    );

    const response = await request(createTestApp(service)).get(
      "/products/8b7e3e1a-15c8-4f17-bf0d-7c4048c5a90e",
    );

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });
});
