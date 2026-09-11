<script setup lang="ts">
import { ref } from "vue";

import AppNavLink from "../components/navigation/AppNavLink.vue";

const isSidebarOpen = ref(false);

const closeSidebar = (): void => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div v-if="isSidebarOpen" class="fixed inset-0 z-20 bg-slate-950/40 lg:hidden" aria-hidden="true" @click="closeSidebar" />

    <aside
      class="fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Seakun</p>
          <p class="mt-1 text-lg font-bold text-slate-950">Inventory Hub</p>
        </div>
        <button type="button" class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Tutup navigasi" @click="closeSidebar">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <nav class="mt-10 space-y-2" aria-label="Navigasi utama">
        <AppNavLink to="/" label="Products" icon="▦" @click="closeSidebar" />
        <AppNavLink to="/products/new" label="Tambah produk" icon="＋" @click="closeSidebar" />
      </nav>

      <div class="mt-auto rounded-2xl bg-indigo-50 p-4">
        <p class="text-sm font-semibold text-indigo-950">Product workspace</p>
        <p class="mt-1 text-xs leading-5 text-indigo-700">Kelola katalog dan stok dalam satu tempat.</p>
      </div>
    </aside>

    <div class="lg:pl-72">
      <header class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-8">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden" aria-label="Buka navigasi" @click="isSidebarOpen = true">
            <span aria-hidden="true">☰</span>
          </button>
          <div class="ml-auto flex items-center gap-3">
            <div class="hidden text-right sm:block">
              <p class="text-sm font-semibold text-slate-900">Admin workspace</p>
              <p class="text-xs text-slate-500">Local environment</p>
            </div>
            <div class="grid size-10 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700" aria-hidden="true">AW</div>
          </div>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:py-10">
        <slot />
      </main>
    </div>
  </div>
</template>
