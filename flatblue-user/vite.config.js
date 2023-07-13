// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        form: resolve(__dirname, 'src/form/index.html'),
        viewer:resolve(__dirname, 'src/post_viewer/index.html')
      },
    },
  },
})
