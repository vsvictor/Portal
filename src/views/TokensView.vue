<template>
  <section class="tokens-view section">
    <div class="container tokens-view__content">
      <h1 class="tokens-view__title">Авторизація...</h1>
      <p class="tokens-view__text">Обробляємо токени доступу, зачекайте декілька секунд.</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'

const route = useRoute()
const router = useRouter()
const { checkAuth } = useAuth()

const TOKEN_KEYS = ['auth_token', 'token', 'access_token', 'jwt', 'id_token', 'session_token']
const USER_NAME_KEYS = ['auth_user_full_name', 'user_full_name', 'full_name', 'userName', 'name']

function persistTokensFromParams(params) {
  for (const key of TOKEN_KEYS) {
    const value = params.get(key)
    if (value) {
      localStorage.setItem(key, value)
    }
  }

  for (const key of USER_NAME_KEYS) {
    const value = params.get(key)
    if (value) {
      localStorage.setItem('auth_user_full_name', value)
      break
    }
  }
}

function safeRedirectTarget(target) {
  if (typeof target !== 'string' || !target.startsWith('/')) {
    return '/'
  }

  // Блокуємо протокольні URL та подвійні слеші (open redirect)
  if (target.startsWith('//') || target.includes('://')) {
    return '/'
  }

  return target
}

onMounted(async () => {
  const queryParams = new URLSearchParams(window.location.search)
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))

  persistTokensFromParams(queryParams)
  persistTokensFromParams(hashParams)

  checkAuth()

  const redirectTarget = safeRedirectTarget(
    route.query.redirect || queryParams.get('redirect') || hashParams.get('redirect') || '/',
  )

  await router.replace(redirectTarget)
})
</script>

<style scoped>
.tokens-view__content {
  text-align: center;
}

.tokens-view__title {
  margin-bottom: var(--space-3);
}

.tokens-view__text {
  color: var(--color-text-secondary);
}
</style>

