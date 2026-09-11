<script setup lang="ts">
defineProps<{
  to: string;
  label: string;
  icon: string;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
    active-class="bg-indigo-50 text-indigo-700"
  >
    <span class="grid size-7 place-items-center rounded-lg bg-slate-100 text-base" aria-hidden="true">{{ icon }}</span>
    <span>{{ label }}</span>
  </RouterLink>
</template>
