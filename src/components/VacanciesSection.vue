<template>
  <section id="vacancies" class="section section--alt">
    <div class="container">
      <div class="section__header">
        <span class="section__eyebrow">Вакансії</span>
        <h2 class="section__title">Приєднуйтесь до команди</h2>
        <p class="section__subtitle">
          Ми шукаємо талановитих фахівців, які хочуть робити внесок у цифровізацію держави
        </p>
      </div>

      <div class="vacancies__grid">
        <article v-for="vacancy in vacancies" :key="vacancy.id" class="vacancy-card">
          <div class="vacancy-card__header">
            <div>
              <h3 class="vacancy-card__title">{{ vacancy.title }}</h3>
              <p class="vacancy-card__department">{{ vacancy.department }}</p>
            </div>
            <span class="vacancy-card__salary">{{ vacancy.salary }}</span>
          </div>

          <p class="vacancy-card__summary">{{ vacancy.summary }}</p>

          <div class="vacancy-card__meta">
            <span class="vacancy-card__meta-item">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ vacancy.location }}
            </span>
            <span class="vacancy-card__meta-item">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formatDate(vacancy.posted) }}
            </span>
            <span class="vacancy-card__meta-item">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              {{ vacancy.type }}
            </span>
          </div>

          <div class="vacancy-card__tags">
            <span v-for="tag in vacancy.tags" :key="tag" class="badge badge--primary">{{ tag }}</span>
          </div>

          <RouterLink :to="`/vacancies/${vacancy.id}`" class="btn btn--primary vacancy-card__btn">
            Детальніше
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vacancies } from '@/data/vacancies.js'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<style scoped>
.vacancies__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.vacancy-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: all var(--transition-base);
}

.vacancy-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: transparent;
}

.vacancy-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}

.vacancy-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug);
  margin-bottom: var(--space-1);
}

.vacancy-card__department {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.vacancy-card__salary {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  white-space: nowrap;
  padding: var(--space-2) var(--space-3);
  background: var(--color-accent);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.vacancy-card__summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.vacancy-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.vacancy-card__meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.vacancy-card__meta-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

.vacancy-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.vacancy-card__btn {
  align-self: flex-start;
  margin-top: auto;
}

@media (max-width: 768px) {
  .vacancies__grid {
    grid-template-columns: 1fr;
  }

  .vacancy-card__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
