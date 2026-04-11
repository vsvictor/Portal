import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// ── Примусовий HTTP → HTTPS редирект ─────────────────────────────────────────
// Спрацьовує лише якщо додаток відкрито по HTTP поза localhost
// (localhost залишаємо для локальної розробки та сервісів на 127.0.0.1)
if (
  typeof window !== 'undefined' &&
  window.location.protocol === 'https:' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1'
) {
  window.location.replace('https://' + window.location.host +
      window.location.pathname +
      window.location.search +
      window.location.hash,
  )
}
// ─────────────────────────────────────────────────────────────────────────────

const app = createApp(App)
app.use(router)
app.mount('#app')
