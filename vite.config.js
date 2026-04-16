import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    // Вмикає HTTPS у dev-сервері (обов'язково для HTTP/3)
    basicSsl(),
  ],
  server: {
    https: true,
    port: 5173,
    open: 'https://localhost:5173',  // одразу відкриває HTTPS у браузері
  },
  preview: {
    https: true,
    port: 4173,
    open: 'https://localhost:4173',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
