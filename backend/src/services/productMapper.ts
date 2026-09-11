import type { Product } from "../generated/prisma/client.js";
import type { ProductResponse } from "../types/product.js";

export const toProductResponse = (product: Product): ProductResponse => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: Number(product.price),
  stock: product.stock,
  category: product.category,
  imageUrl: product.imageUrl,
  createdAt: product.createdAt.toISOString(),
  updatedAt: product.updatedAt.toISOString(),
});
