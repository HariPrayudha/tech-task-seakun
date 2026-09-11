import { defineStore } from "pinia";
import { ref } from "vue";

import { getApiErrorMessage } from "../services/httpClient";
import { productService } from "../services/productService";
import type { Product, ProductListMeta } from "../types/product";

const initialMeta: ProductListMeta = {
  page: 1,
  limit: 10,
  totalItems: 0,
  totalPages: 0,
};

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const meta = ref<ProductListMeta>(initialMeta);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const response = await productService.getProducts({ page: 1, limit: 10, sortBy: "updatedAt", sortOrder: "desc" });
      products.value = response.products;
      meta.value = response.meta;
    } catch (error: unknown) {
      errorMessage.value = getApiErrorMessage(error, "Produk belum dapat dimuat.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    products,
    meta,
    isLoading,
    errorMessage,
    fetchProducts,
  };
});
