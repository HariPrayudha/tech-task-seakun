import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  cacheDir: ".vite",
  optimizeDeps: {
    noDiscovery: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
