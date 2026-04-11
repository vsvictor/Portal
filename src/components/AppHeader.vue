<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container header__inner">
      <div class="header__left">
        <RouterLink to="/" class="header__logo" @click="closeMenu">
          <img src="@/assets/logo.svg" alt="ДП «Цифрове»" width="160" height="48" />
        </RouterLink>

        <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }">
          <RouterLink to="/about" class="header__nav-link" @click="closeMenu">Про нас</RouterLink>
          <RouterLink to="/services" class="header__nav-link" @click="closeMenu"
            >Послуги</RouterLink
          >
          <RouterLink to="/projects" class="header__nav-link" @click="closeMenu"
            >Проєкти</RouterLink
          >

          <RouterLink to="/news" class="header__nav-link" @click="closeMenu">Новини</RouterLink>
          <RouterLink to="/vacancies" class="header__nav-link" @click="closeMenu"
            >Вакансії</RouterLink
          >

          <RouterLink to="/contacts" class="header__nav-link" @click="closeMenu"
            >Контакти</RouterLink
          >
          <RouterLink to="/appeal" class="header__nav-link" @click="closeMenu"
            >Звернення</RouterLink
          >
        </nav>
      </div>

      <div class="header__actions">
        <button
          v-if="!isAuthenticated"
          type="button"
          class="btn btn--primary header__login"
          @click="handleLogin"
        >
          Увійти
        </button>
        <button
          v-else
          type="button"
          class="btn btn--outline header__login header__logout"
          :data-user-name="userFullName"
          @click="handleLogout"
        >
          Вийти
        </button>

        <button
          class="header__burger"
          :class="{ 'header__burger--active': menuOpen }"
          :aria-expanded="menuOpen"
          aria-label="Відкрити меню"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import { useLoginModal } from '@/composables/useLoginModal.js'

const isScrolled = ref(false)
const menuOpen = ref(false)
const { isAuthenticated, userFullName, checkAuth, logout } = useAuth()
const { openModal } = useLoginModal()

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

function handleLogin() {
  closeMenu()
  openModal()
}

function handleLogout() {
  closeMenu()
  logout()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  checkAuth()
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
  height: var(--header-height);
  display: flex;
  align-items: center;
}

.header--scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-md);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

/* NEW: left-align logo + nav as one block */
.header__left {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  min-width: 0;
  flex: 1;
}

.header__logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.header__logo img {
  height: 44px;
  width: auto;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
  flex-shrink: 0;
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* left aligned */
  gap: var(--space-1);
  min-width: 0;
  flex: 1;
}

.header__nav-link {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.header__nav-link:hover {
  color: var(--color-primary);
  background: var(--color-accent);
}

.header__login {
  padding: var(--space-2) var(--space-5);
  font-size: var(--font-size-sm);
}

.header__logout {
  position: relative;
}

.header__logout::after {
  content: attr(data-user-name);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  transform: translateX(-50%) translateY(4px);
  background: var(--color-text-primary);
  color: var(--color-text-inverse);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  z-index: 2;
}

.header__logout:hover::after,
.header__logout:focus-visible::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.header__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
}

.header__burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: all var(--transition-base);
  transform-origin: center;
}

.header__burger--active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__burger--active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.header__burger--active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 900px) {
  .header__inner {
    gap: var(--space-4);
  }

  .header__left {
    gap: var(--space-4);
  }

  .header__burger {
    display: flex;
  }

  .header__nav {
    position: fixed;
    inset: var(--header-height) 0 0 0;
    background: var(--color-bg-primary);
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--space-8) var(--space-6);
    gap: var(--space-2);
    transform: translateX(100%);
    transition: transform var(--transition-base);
    border-top: 1px solid var(--color-border);
    overflow-y: auto;
  }

  .header__nav--open {
    transform: translateX(0);
  }

  .header__nav-link {
    font-size: var(--font-size-lg);
    padding: var(--space-3) var(--space-4);
    width: 100%;
  }

  .header__login {
    padding: var(--space-2) var(--space-4);
  }
}
</style>
