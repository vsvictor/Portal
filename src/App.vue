<template>
  <div class="app">
    <AppHeader />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <LoginModal />
    <ToolsModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoginModal from '@/components/LoginModal.vue'
import ToolsModal from '@/components/ToolsModal.vue'
import { useAuth } from '@/composables/useAuth.js'

const { checkAuth } = useAuth()

// Перевірка автентифікації при першому завантаженні додатку
onMounted(() => {
  checkAuth()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
