import { dirname, resolve, join } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: join(__dirname, 'src/frontend'),
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'src/frontend/index.html'),
        nested: resolve(import.meta.dirname, 'src/frontend/host/index.html'),
      },
    },
  },
})