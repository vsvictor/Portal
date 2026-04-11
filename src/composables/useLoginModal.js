import { ref } from 'vue'

const isLoginModalOpen = ref(false)

export function useLoginModal() {
  function openModal() {
    isLoginModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    isLoginModalOpen.value = false
    document.body.style.overflow = ''
  }

  return { isLoginModalOpen, openModal, closeModal }
}
