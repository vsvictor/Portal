import { ref } from 'vue'

// Singleton: стан спільний для всіх компонентів
const isAuthenticated = ref(false)
const userFullName = ref('')

const TOKEN_KEYS = ['auth_token', 'token', 'access_token', 'refresh_token', 'jwt', 'id_token', 'session_token']
const USER_NAME_KEYS = ['auth_user_full_name', 'user_full_name', 'full_name', 'userName', 'name']
const USER_OBJECT_KEYS = ['auth_user', 'user', 'current_user', 'profile']
const REFRESH_TOKEN_KEYS = ['refresh_token', 'refreshToken']
const PERSONAL_DATA_KEYS = [
  'profile',
  'auth_user',
  'user',
  'current_user',
  'auth_user_id',
  'user_id',
  'email',
  'username',
  'full_name',
  'user_full_name',
  'auth_user_full_name',
]

function getFirstStorageValue(keys) {
  for (const key of keys) {
    const local = localStorage.getItem(key)
    if (local) return local

    const session = sessionStorage.getItem(key)
    if (session) return session
  }
  return ''
}

function getUserNameFromObject(rawValue) {
  try {
    const parsed = JSON.parse(rawValue)
    const fullName = [parsed?.last_name, parsed?.first_name, parsed?.patronymic]
      .filter(Boolean)
      .join(' ')
    return fullName || parsed?.fullName || parsed?.full_name || parsed?.name || ''
  } catch {
    return ''
  }
}

function hasKnownAuthCookie() {
  const cookie = document.cookie || ''
  return /(auth_token|session_id|access_token|jwt)=/.test(cookie)
}

function hydrateAuthFromUrl() {
  const url = new URL(window.location.href)
  let changed = false

  for (const key of TOKEN_KEYS) {
    const value = url.searchParams.get(key)
    if (value) {
      localStorage.setItem(key, value)
      url.searchParams.delete(key)
      changed = true
    }
  }

  for (const key of USER_NAME_KEYS) {
    const value = url.searchParams.get(key)
    if (value) {
      localStorage.setItem('auth_user_full_name', value)
      url.searchParams.delete(key)
      changed = true
      break
    }
  }

  if (changed) {
    window.history.replaceState({}, '', url.toString())
  }
}

function clearSensitiveByPattern(storage) {
  const sensitivePattern = /(auth|token|profile|user|email|name)/i
  for (let i = storage.length - 1; i >= 0; i--) {
    const key = storage.key(i)
    if (key && sensitivePattern.test(key)) {
      storage.removeItem(key)
    }
  }
}

export function useAuth() {
  /**
   * Перевіряє наявність токена в localStorage.
   * Токен записується після успішного входу через http://127.0.0.1:7101
   */
  function checkAuth() {
    hydrateAuthFromUrl()

    const token = getFirstStorageValue(TOKEN_KEYS)
    const cookieAuth = hasKnownAuthCookie()
    isAuthenticated.value = !!token || cookieAuth

    if (!isAuthenticated.value) {
      userFullName.value = ''
      return
    }

    const fullName = getFirstStorageValue(USER_NAME_KEYS)

    if (fullName) {
      userFullName.value = fullName
      return
    }

    const rawUser = getFirstStorageValue(USER_OBJECT_KEYS)
    if (rawUser) {
      const parsedName = getUserNameFromObject(rawUser)
      if (parsedName) {
        userFullName.value = parsedName
        return
      }
    }

    userFullName.value = 'Користувач'
  }

  /** Відправляє logout на backend (якщо є refresh_token), потім очищає локальний стан */
  async function logout() {
    const refreshToken = getFirstStorageValue(REFRESH_TOKEN_KEYS)

    if (refreshToken) {
      try {
        const response = await fetch('/logout/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        })

        if (!response.ok && import.meta.env.DEV) {
          console.warn('[useAuth] Logout API повернув', response.status)
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('[useAuth] Не вдалося виконати logout API:', error)
        }
      }
    }

    for (const key of TOKEN_KEYS) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }

    for (const key of USER_NAME_KEYS) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }

    for (const key of USER_OBJECT_KEYS) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }

    for (const key of PERSONAL_DATA_KEYS) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }

    // Додатковий захист: очищаємо будь-які ключі з чутливими патернами
    clearSensitiveByPattern(localStorage)
    clearSensitiveByPattern(sessionStorage)

    isAuthenticated.value = false
    userFullName.value = ''
  }

  return { isAuthenticated, userFullName, checkAuth, logout }
}
