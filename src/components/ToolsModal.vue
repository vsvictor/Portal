<template>
  <Transition name="tools-modal-fade">
    <div
      v-if="isToolsModalOpen"
      class="tools-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Інструменти"
      @click.self="closeToolsModal"
    >
      <div class="tools-modal">
<!--        <div class="tools-modal__header">
          <h2>Інструменти</h2> -
          <button type="button" class="tools-modal__close" @click="closeToolsModal" aria-label="Закрити">
            ✕
          </button>
        </div> -->

        <div class="tools-modal__tabs" role="tablist" aria-label="Розділи інструментів">
          <button
            type="button"
            class="tools-modal__tab"
            :class="{ 'tools-modal__tab--active': activeToolsTab === 'projects' }"
            role="tab"
            :aria-selected="activeToolsTab === 'projects'"
            @click="setToolsTab('projects')"
          >
            Управління проектами
          </button>
          <button
            type="button"
            class="tools-modal__tab"
            :class="{ 'tools-modal__tab--active': activeToolsTab === 'documents' }"
            role="tab"
            :aria-selected="activeToolsTab === 'documents'"
            @click="setToolsTab('documents')"
          >
            Документи
          </button>
          <button
            type="button"
            class="tools-modal__tab"
            :class="{ 'tools-modal__tab--active': activeToolsTab === 'chat' }"
            role="tab"
            :aria-selected="activeToolsTab === 'chat'"
            @click="setToolsTab('chat')"
          >
            Чат
          </button>
          <button
            type="button"
            class="tools-modal__tab"
            :class="{ 'tools-modal__tab--active': activeToolsTab === 'sed' }"
            role="tab"
            :aria-selected="activeToolsTab === 'sed'"
            @click="setToolsTab('sed')"
          >
            СЕД
          </button>
        </div>

        <div class="tools-modal__content" role="tabpanel">
          <section v-if="activeToolsTab === 'projects'" class="tools-panel">
            <h3>Управління проектами</h3>
            <p>Тут буде панель контролю проєктів: задачі, етапи та статуси.</p>
          </section>

          <section v-else-if="activeToolsTab === 'documents'" class="tools-panel">
            <h3>Документи</h3>
            <p>Тут буде каталог документів: шаблони, файли та погодження.</p>
          </section>

          <section v-else-if="activeToolsTab === 'chat'" class="tools-panel">
            <h3>Чат</h3>
            <p>Тут буде робочий чат для команди та швидких обговорень.</p>
          </section>

          <section v-else-if="activeToolsTab === 'sed'" class="tools-panel">
            <h3>СЕД</h3>
            <p>Тут буде розділ системи електронного документообігу.</p>
          </section>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from 'vue'
import { useToolsModal } from '@/composables/useToolsModal.js'

const { isToolsModalOpen, activeToolsTab, closeToolsModal, setToolsTab } = useToolsModal()

watch(isToolsModalOpen, (opened) => {
  document.body.style.overflow = opened ? 'hidden' : ''
})
</script>

<style scoped>
.tools-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.52);
  z-index: 2100;
}

.tools-modal {
  height: 100vh;
  width: 100%;
  background: var(--color-bg-primary);
  display: grid;
  grid-template-rows: auto auto 1fr;
}

.tools-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid var(--color-border);
}

.tools-modal__header h2 {
  margin: 0;
  font-size: var(--font-size-2xl);
}

.tools-modal__close {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.tools-modal__close:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
}

.tools-modal__tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
  gap: 0;
  padding: 0;
  border-bottom: 1px solid var(--color-border);
}

.tools-modal__tab {
  border: none;
  border-right: 1px solid var(--color-border);
  border-bottom: 2px solid transparent;
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  min-height: 56px;
  padding: 10px 14px;
  width: 100%;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
}

.tools-modal__tab:last-child {
  border-right: none;
}

.tools-modal__tab--active {
  border-bottom-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-accent);
}

.tools-modal__content {
  overflow-y: auto;
  padding: var(--space-8);
}

.tools-panel h3 {
  margin: 0 0 var(--space-3);
  font-size: var(--font-size-xl);
}

.tools-panel p {
  margin: 0;
  color: var(--color-text-secondary);
}

.tools-modal-fade-enter-active,
.tools-modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tools-modal-fade-enter-from,
.tools-modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .tools-modal__header,
  .tools-modal__content {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }
}

@media (max-width: 480px) {
  .tools-modal__tab {
    min-height: 64px;
    padding: 8px 10px;
    font-size: var(--font-size-xs);
    line-height: 1.2;
  }
}
</style>

