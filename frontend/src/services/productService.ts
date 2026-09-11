import type { PaginatedApiResponse } from "../types/api";
import type { Product, ProductListQuery, ProductListResponse } from "../types/product";
import { httpClient } from "./httpClient";

export const productService = {
  async getProducts(query: ProductListQuery = {}): Promise<ProductListResponse> {
    const response = await httpClient.get<PaginatedApiResponse<Product, ProductListResponse["meta"]>>("/products", {
      params: query,
    });

    return {
      products: response.data.data,
      meta: response.data.meta,
    };
  },
};
