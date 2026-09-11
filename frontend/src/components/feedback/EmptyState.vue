<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
    <div class="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-xl text-slate-500" aria-hidden="true">∅</div>
    <h2 class="mt-4 text-base font-semibold text-slate-900">{{ title }}</h2>
    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{{ description }}</p>
  </div>
</template>
