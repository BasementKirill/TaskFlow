import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname, 'src/renderer'), // Vite zeigt auf das Frontend-Verzeichnis
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist/renderer'),
  }
})