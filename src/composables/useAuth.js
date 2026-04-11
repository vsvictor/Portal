import { ref } from 'vue'

// Singleton: стан спільний для всіх компонентів
const isAuthenticated = ref(false)
const userFullName = ref('')

const TOKEN_KEYS = ['auth_token', 'token', 'access_token', 'jwt', 'id_token', 'session_token']
const USER_NAME_KEYS = ['auth_user_full_name', 'user_full_name', 'full_name', 'userName', 'name']
const USER_OBJECT_KEYS = ['auth_user', 'user', 'current_user', 'profile']

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
    return parsed?.fullName || parsed?.full_name || parsed?.name || ''
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

  /** Очищає токен і скидає стан (для майбутнього logout) */
  function logout() {
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

    isAuthenticated.value = false
    userFullName.value = ''
  }

  return { isAuthenticated, userFullName, checkAuth, logout }
}

