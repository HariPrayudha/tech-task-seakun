import { describe, expect, it } from "vitest";

import {
  createProductBodySchema,
  listProductsQuerySchema,
  updateProductBodySchema,
} from "../src/schemas/productSchemas.js";

describe("product schemas", () => {
  it("normalizes pagination query values", () => {
    const query = listProductsQuerySchema.parse({
      page: "2",
      limit: "25",
      search: " keyboard ",
      sortBy: "price",
      sortOrder: "asc",
    });

    expect(query).toEqual({
      page: 2,
      limit: 25,
      search: "keyboard",
      sortBy: "price",
      sortOrder: "asc",
    });
  });

  it("rejects negative prices and stocks", () => {
    expect(() =>
      createProductBodySchema.parse({
        name: "Keyboard",
        price: -1,
        stock: 10,
      }),
    ).toThrow();

    expect(() =>
      createProductBodySchema.parse({
        name: "Keyboard",
        price: 100,
        stock: -1,
      }),
    ).toThrow();
  });

  it("rejects an empty partial update", () => {
    expect(() => updateProductBodySchema.parse({})).toThrow();
  });
});
