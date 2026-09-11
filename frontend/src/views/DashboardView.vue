<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterLink } from "vue-router";

import StatCard from "../components/dashboard/StatCard.vue";
import AppAlert from "../components/feedback/AppAlert.vue";
import EmptyState from "../components/feedback/EmptyState.vue";
import LoadingState from "../components/feedback/LoadingState.vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();

const totalStock = computed(() => productStore.products.reduce((total, product) => total + product.stock, 0));
const categoryCount = computed(() => new Set(productStore.products.map((product) => product.category).filter(Boolean)).size);

onMounted(() => {
  void productStore.fetchProducts();
});
</script>

<template>
  <section>
    <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Overview</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Product inventory</h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Pantau katalog produk dan stok yang sedang dikelola dalam workspace ini.</p>
      </div>
      <RouterLink to="/products/new" class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span aria-hidden="true">＋</span>
        <span class="ml-2">Tambah produk</span>
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <StatCard label="Total produk" :value="String(productStore.meta.totalItems)" detail="Jumlah item pada katalog" accent="indigo" />
      <StatCard label="Total stok" :value="String(totalStock)" detail="Stok dari produk di halaman ini" accent="emerald" />
      <StatCard label="Kategori aktif" :value="String(categoryCount)" detail="Kategori terdeteksi pada halaman ini" accent="amber" />
    </div>

    <div class="mt-8 flex items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-slate-950">Produk terbaru</h2>
        <p class="mt-1 text-sm text-slate-500">Data ini menjadi fondasi untuk product flow pada Phase 5.</p>
      </div>
    </div>

    <div class="mt-4">
      <LoadingState v-if="productStore.isLoading" />
      <AppAlert v-else-if="productStore.errorMessage" :message="productStore.errorMessage" tone="error" />
      <EmptyState v-else-if="productStore.products.length === 0" title="Belum ada produk" description="Tambahkan produk pertama untuk mulai mengelola inventory." />
      <div v-else class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th class="px-5 py-4 font-semibold">Nama produk</th>
                <th class="px-5 py-4 font-semibold">Kategori</th>
                <th class="px-5 py-4 font-semibold">Stok</th>
                <th class="px-5 py-4 font-semibold">Harga</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="product in productStore.products" :key="product.id">
                <td class="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">{{ product.name }}</td>
                <td class="whitespace-nowrap px-5 py-4 text-slate-500">{{ product.category ?? "Tanpa kategori" }}</td>
                <td class="whitespace-nowrap px-5 py-4 text-slate-600">{{ product.stock }}</td>
                <td class="whitespace-nowrap px-5 py-4 text-slate-600">Rp {{ product.price.toLocaleString("id-ID") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
