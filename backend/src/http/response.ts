import type { ProductListMeta } from "../types/product.js";

export const successResponse = <T>(data: T) => ({
  success: true as const,
  data,
});

export const paginatedResponse = <T>(data: T[], meta: ProductListMeta) => ({
  success: true as const,
  data,
  meta,
});
