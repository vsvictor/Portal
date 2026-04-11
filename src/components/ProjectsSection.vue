<template>
  <section id="projects" class="section section--alt">
    <div class="container">
      <div class="section__header">
        <span class="section__eyebrow">Проєкти</span>
        <h2 class="section__title">Ключові реалізації</h2>
        <p class="section__subtitle">
          Відібрані проєкти, що демонструють наш досвід у цифровізації державного управління
        </p>
      </div>

      <div class="projects__grid">
        <div v-for="project in projects" :key="project.title" class="project-card">
          <div class="project-card__header" :style="{ background: project.color }">
            <span class="project-card__icon">{{ project.icon }}</span>
            <div class="project-card__header-right">
              <button
                v-if="isAuthenticated"
                class="project-card__edit"
                :title="`Редагувати: ${project.title}`"
                aria-label="Редагувати проєкт"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <span class="badge badge--yellow">{{ project.status }}</span>
            </div>
          </div>
          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="project-card__start">Старт: {{ project.start }}</span>
              <span class="project-card__category">{{ project.category }}</span>
            </div>
            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__desc">{{ project.description }}</p>
            <div class="project-card__tags">
              <span v-for="tag in project.tags" :key="tag" class="badge badge--primary">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth.js'
import { projects } from '@/data/projects.js'

const { isAuthenticated } = useAuth()
</script>

<style scoped>
.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.project-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.project-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: transparent;
}

.project-card__header {
  padding: var(--space-8) var(--space-6) var(--space-6);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.project-card__header-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.project-card__edit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-md);
  color: #ffffff;
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.project-card__edit:hover {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

.project-card__icon {
  font-size: 2.5rem;
}

.project-card__body {
  padding: var(--space-6);
}

.project-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.project-card__start {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  background: var(--color-bg-secondary);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

.project-card__category {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.project-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  line-height: var(--line-height-snug);
}

.project-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@media (max-width: 1024px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
