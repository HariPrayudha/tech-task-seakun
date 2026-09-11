<script setup lang="ts">
import { RouterLink } from "vue-router";

import AppAlert from "../components/feedback/AppAlert.vue";
</script>

<template>
  <section class="mx-auto max-w-2xl">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Product flow</p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">Tambah produk</h1>
    <p class="mt-3 text-sm leading-6 text-slate-500">Halaman ini sudah terhubung ke routing aplikasi dan akan diisi form CRUD reusable pada Phase 5.</p>

    <div class="mt-8">
      <AppAlert message="Product form akan tersedia pada fase frontend product flow berikutnya." />
    </div>

    <RouterLink to="/" class="mt-6 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Kembali ke dashboard</RouterLink>
  </section>
</template>
