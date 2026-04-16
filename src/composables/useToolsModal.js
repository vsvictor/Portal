import { ref } from 'vue'

const TOOLS_TABS = ['projects', 'documents', 'chat', 'sed']
const isToolsModalOpen = ref(false)
const activeToolsTab = ref('projects')
const TOOLS_MODAL_HISTORY_KEY = '__tools_modal__'

let popstateBound = false

function normalizeTab(tab) {
  return TOOLS_TABS.includes(tab) ? tab : 'projects'
}

function ensureBackHandler() {
  if (popstateBound || typeof window === 'undefined') return

  window.addEventListener('popstate', () => {
    if (!isToolsModalOpen.value) return

    isToolsModalOpen.value = false
    activeToolsTab.value = 'projects'

    // Якщо вже на головній — плавно скролимо до Hero, маршрут не змінюємо
    const onHome = typeof window !== 'undefined' && (
      window.location.pathname === '/' || window.location.pathname === ''
    )
    if (onHome) {
      const hero = document.getElementById('hero')
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' })
      }
    }
  })

  popstateBound = true
}

export function useToolsModal() {
  function openToolsModal(tab = 'projects') {
    ensureBackHandler()
    activeToolsTab.value = normalizeTab(tab)

    if (!isToolsModalOpen.value && typeof window !== 'undefined') {
      const nextState = {
        ...(window.history.state || {}),
        [TOOLS_MODAL_HISTORY_KEY]: true,
      }
      window.history.pushState(nextState, '', window.location.href)
    }

    isToolsModalOpen.value = true
  }

  function closeToolsModal() {
    const shouldGoBack =
      typeof window !== 'undefined' &&
      isToolsModalOpen.value &&
      window.history.state?.[TOOLS_MODAL_HISTORY_KEY]

    isToolsModalOpen.value = false

    if (shouldGoBack) {
      window.history.back()
    }
  }

  function setToolsTab(tab) {
    activeToolsTab.value = normalizeTab(tab)
  }

  return {
    TOOLS_TABS,
    isToolsModalOpen,
    activeToolsTab,
    openToolsModal,
    closeToolsModal,
    setToolsTab,
  }
}

