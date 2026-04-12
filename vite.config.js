import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { fileURLToPath, URL } from 'node:url'

const authApiTarget = process.env.AUTH_API_TARGET || 'http://127.0.0.1:7101'
const profileApiTarget = process.env.PROFILE_API_TARGET || 'http://127.0.0.1:7300'
//const authApiTarget = process.env.AUTH_API_TARGET || 'http://127.0.0.1:7443/auth/login'
//const profileApiTarget = process.env.PROFILE_API_TARGET || 'https://127.0.0.1:7433/profile'

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
    proxy: {
      '/login/api': {
        target: authApiTarget,
        changeOrigin: true,
        secure: false,
      },
      '/logout/api': {
        target: authApiTarget,
        changeOrigin: true,
        secure: false,
      },
      '/profile/api/': {
        target: profileApiTarget,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/profile\/api/, '/profile'),
      },
      '/api': {
        target: 'https://127.0.0.1:7443',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
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
