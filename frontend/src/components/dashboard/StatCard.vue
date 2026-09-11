<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  detail: string;
  accent: "indigo" | "emerald" | "amber";
}>();
</script>

<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ label }}</p>
        <p class="mt-3 text-3xl font-bold tracking-tight text-slate-950">{{ value }}</p>
      </div>
      <span
        class="size-3 rounded-full"
        :class="{
          'bg-indigo-500': accent === 'indigo',
          'bg-emerald-500': accent === 'emerald',
          'bg-amber-500': accent === 'amber',
        }"
        aria-hidden="true"
      />
    </div>
    <p class="mt-4 text-xs text-slate-500">{{ detail }}</p>
  </article>
</template>
