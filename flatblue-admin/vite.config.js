// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        viewer: resolve(__dirname, "src/posts_panel/index.html"),
      },
    },
  },
});
