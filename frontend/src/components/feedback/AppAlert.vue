<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string;
    tone?: "error" | "info" | "success";
  }>(),
  { tone: "info" },
);
</script>

<template>
  <div
    class="rounded-xl border px-4 py-3 text-sm"
    :class="{
      'border-red-200 bg-red-50 text-red-700': tone === 'error',
      'border-blue-200 bg-blue-50 text-blue-700': tone === 'info',
      'border-emerald-200 bg-emerald-50 text-emerald-700': tone === 'success',
    }"
    role="status"
  >
    {{ message }}
  </div>
</template>
