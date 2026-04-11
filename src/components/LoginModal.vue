<template>
  <Transition name="modal-fade">
    <div v-if="isLoginModalOpen" class="login-modal-overlay" @click.self="closeModal">
      <div class="login-modal">
        <button type="button" class="login-modal__close" @click="closeModal" aria-label="Закрити">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="login-modal__header">
          <h2 class="login-modal__title">Вхід в систему</h2>
          <p class="login-modal__subtitle">ДП «Цифрове»</p>
        </div>

        <form class="login-modal__form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Пароль</label>
            <div class="password-field">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Сховати пароль' : 'Показати пароль'"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7 19 2.73 15.11 1 12c.92-1.65 2.18-3.17 3.7-4.46"
                  />
                  <path d="M10.58 10.58a2 2 0 1 0 2.83 2.83" />
                  <path
                    d="M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9.27 3.89 11 7-1 1.8-2.5 3.4-4.35 4.66"
                  />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          <div class="login-modal__actions">
            <button type="submit" class="btn btn--primary login-modal__submit">Увійти</button>
            <button type="button" class="btn btn--outline login-modal__cancel" @click="closeModal">
              Відмінити
            </button>
          </div>
        </form>

        <div class="login-modal__footer">
          <a href="#" class="login-modal__link" @click.prevent="handleForgotPassword">
            Забули пароль?
            <span class="login-modal__link-accent">Відновити</span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginModal } from '@/composables/useLoginModal.js'
import { useAuth } from '@/composables/useAuth.js'

const { isLoginModalOpen, closeModal } = useLoginModal()
const { checkAuth } = useAuth()

const email = ref('admin@admin.com')
const password = ref('admin123')
const showPassword = ref(false)

const isDev = import.meta.env.DEV
function devLog(...args) {
  if (isDev) console.log('[LoginModal]', ...args)
}

function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length < 2) return null

  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')

  try {
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

async function fetchAndStoreUserProfile(userId) {
  const encodedId = encodeURIComponent(userId)
  const profilePath = `/profile/api/${encodedId}`
  const directUrl = `http://127.0.0.1:7300/profile/${encodedId}`

  devLog('Запит профілю:', directUrl)

  const response = await fetch(profilePath)
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  devLog(`Profile HTTP ${response.status} ${response.statusText}`)
  devLog('Профіль:', payload)

  if (!response.ok) {
    throw new Error(`Profile HTTP ${response.status}`)
  }

  if (typeof payload === 'string') {
    localStorage.setItem('profile', payload)
    return
  }

  localStorage.setItem('profile', JSON.stringify(payload))
  localStorage.setItem('auth_user', JSON.stringify(payload))

  const profileName = payload?.fullName || payload?.full_name || payload?.name
  if (profileName) {
    localStorage.setItem('auth_user_full_name', profileName)
  }
}

async function handleSubmit() {
  devLog('Спроба входу:', { username: email.value })
  try {
    const response = await fetch('/login/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.value, password: password.value }),
    })

    devLog(`HTTP ${response.status} ${response.statusText}`)
    devLog('Headers:', Object.fromEntries(response.headers.entries()))

    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    devLog('Відповідь сервера:', payload)

    if (!response.ok) {
      devLog('Помилка входу:', response.status, payload)
      throw new Error(`HTTP ${response.status}`)
    }

    if (payload?.access_token) {
      localStorage.setItem('access_token', payload.access_token)
      devLog('access_token збережено в localStorage')
    }
    if (payload?.refresh_token) {
      localStorage.setItem('refresh_token', payload.refresh_token)
      devLog('refresh_token збережено в localStorage')
    }

    const jwtPayload = decodeJwtPayload(payload?.access_token)
    if (jwtPayload) {
      devLog('JWT payload:', jwtPayload)
      const name = jwtPayload?.full_name || jwtPayload?.name || jwtPayload?.sub || email.value
      localStorage.setItem('auth_user_full_name', name)
      devLog('Ім\'я користувача:', name)

      const userId = jwtPayload?.id || jwtPayload?.user_id || ''
      if (userId) {
        try {
          await fetchAndStoreUserProfile(userId)
        } catch (profileError) {
          devLog('Не вдалося отримати профіль:', profileError)
        }
      } else {
        devLog('ID користувача не знайдено в токені')
      }
    } else {
      localStorage.setItem('auth_user_full_name', email.value)
      devLog('Не вдалося розпарсити JWT, використовуємо email:', email.value)
    }

    checkAuth()
    devLog('Автентифікація успішна')
    closeModal()
    email.value = 'admin@admin.com'
    password.value = 'admin123'

  } catch (error) {
    devLog('Помилка:', error)
    console.error('Помилка запиту входу:', error)
  }
}

function handleForgotPassword() {
  const recoveryUrl = window.location.protocol + '//' + window.location.host + '/forgot-password'
  window.location.assign(recoveryUrl)
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.login-modal {
  position: relative;
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 400px;
  padding: var(--space-8);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-modal__close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.login-modal__close:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.login-modal__header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.login-modal__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.login-modal__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.login-modal__form {
  margin-bottom: var(--space-6);
}

.password-field {
  position: relative;
}

.password-field .form-control {
  padding-right: 84px;
}

.password-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--color-primary);
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.password-toggle:hover {
  color: var(--color-primary-dark);
}

.login-modal__actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.login-modal__submit,
.login-modal__cancel {
  flex: 1;
}


.login-modal__footer {
  text-align: center;
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-4);
}

.login-modal__link {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.login-modal__link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

.login-modal__link-accent {
  color: var(--color-secondary-dark);
  font-weight: var(--font-weight-semibold);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .login-modal {
    max-width: calc(100% - 32px);
    margin: 0 16px;
  }
}
</style>
