<template>
  <div class="vacancy-detail">
    <div v-if="vacancy" class="vacancy-detail__wrap">
      <div class="vacancy-detail__hero">
        <div class="container">
          <RouterLink to="/#vacancies" class="vacancy-detail__back">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Повернутися до вакансій
          </RouterLink>

          <div class="vacancy-detail__badges">
            <span class="badge badge--primary">{{ vacancy.department }}</span>
            <span class="badge badge--yellow">{{ vacancy.type }}</span>
          </div>

          <h1 class="vacancy-detail__title">{{ vacancy.title }}</h1>

          <div class="vacancy-detail__meta">
            <span class="vacancy-detail__meta-item">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ vacancy.location }}
            </span>
            <span class="vacancy-detail__meta-item vacancy-detail__salary">
              💰 {{ vacancy.salary }}
            </span>
            <span class="vacancy-detail__meta-item">
              📅 Опубліковано {{ formatDate(vacancy.posted) }}
            </span>
          </div>
        </div>
      </div>

      <div class="container vacancy-detail__body">
        <div class="vacancy-detail__content">
          <section class="vacancy-detail__section">
            <h2 class="vacancy-detail__section-title">Про вакансію</h2>
            <p class="vacancy-detail__summary">{{ vacancy.summary }}</p>
          </section>

          <section class="vacancy-detail__section">
            <h2 class="vacancy-detail__section-title">Вимоги</h2>
            <ul class="vacancy-detail__list">
              <li v-for="req in vacancy.requirements" :key="req" class="vacancy-detail__list-item">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="vacancy-detail__check">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ req }}
              </li>
            </ul>
          </section>

          <section class="vacancy-detail__section">
            <h2 class="vacancy-detail__section-title">Обов'язки</h2>
            <ul class="vacancy-detail__list">
              <li v-for="resp in vacancy.responsibilities" :key="resp" class="vacancy-detail__list-item">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="vacancy-detail__check">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ resp }}
              </li>
            </ul>
          </section>

          <section class="vacancy-detail__section">
            <h2 class="vacancy-detail__section-title">Ми пропонуємо</h2>
            <ul class="vacancy-detail__list vacancy-detail__list--benefits">
              <li v-for="benefit in vacancy.benefits" :key="benefit" class="vacancy-detail__list-item">
                <span class="vacancy-detail__benefit-icon">⭐</span>
                {{ benefit }}
              </li>
            </ul>
          </section>

          <div class="vacancy-detail__tags-section">
            <p class="vacancy-detail__tags-label">Технології та навички:</p>
            <div class="vacancy-detail__tags">
              <span v-for="tag in vacancy.tags" :key="tag" class="badge badge--primary vacancy-detail__tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <aside class="vacancy-detail__sidebar">
          <div class="vacancy-detail__apply-card">
            <h3 class="vacancy-detail__apply-title">Зацікавила вакансія?</h3>
            <p class="vacancy-detail__apply-desc">
              Надішліть нам своє резюме та супровідний лист на електронну пошту, вказавши назву
              вакансії у темі листа.
            </p>
            <a
              href="mailto:hr@digital.gov.ua"
              class="btn btn--primary btn--lg vacancy-detail__apply-btn"
            >
              Надіслати резюме
            </a>
            <a href="mailto:hr@digital.gov.ua" class="vacancy-detail__apply-email">
              hr@digital.gov.ua
            </a>
          </div>

          <div class="vacancy-detail__info-card">
            <h3 class="vacancy-detail__info-title">Деталі вакансії</h3>
            <dl class="vacancy-detail__dl">
              <div class="vacancy-detail__dl-row">
                <dt>Відділ</dt>
                <dd>{{ vacancy.department }}</dd>
              </div>
              <div class="vacancy-detail__dl-row">
                <dt>Тип зайнятості</dt>
                <dd>{{ vacancy.type }}</dd>
              </div>
              <div class="vacancy-detail__dl-row">
                <dt>Місцезнаходження</dt>
                <dd>{{ vacancy.location }}</dd>
              </div>
              <div class="vacancy-detail__dl-row">
                <dt>Зарплата</dt>
                <dd class="vacancy-detail__dl-salary">{{ vacancy.salary }}</dd>
              </div>
            </dl>
          </div>

          <RouterLink to="/#vacancies" class="btn btn--outline vacancy-detail__back-btn">
            ← Усі вакансії
          </RouterLink>
        </aside>
      </div>
    </div>

    <div v-else class="vacancy-detail__not-found">
      <div class="container">
        <div class="vacancy-detail__not-found-inner">
          <span class="vacancy-detail__not-found-icon">💼</span>
          <h1>Вакансію не знайдено</h1>
          <p>На жаль, вакансію з таким ідентифікатором не знайдено.</p>
          <RouterLink to="/#vacancies" class="btn btn--primary">До вакансій</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { vacancies } from '@/data/vacancies.js'

const route = useRoute()

const vacancy = computed(() => vacancies.find((v) => v.id === Number(route.params.id)) ?? null)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<style scoped>
.vacancy-detail__hero {
  background: linear-gradient(135deg, #0f2d5a 0%, #1a56a4 100%);
  padding: var(--space-12) 0 var(--space-16);
  color: #fff;
}

.vacancy-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-8);
  transition: color var(--transition-fast);
}

.vacancy-detail__back:hover {
  color: #fff;
}

.vacancy-detail__badges {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.vacancy-detail__title {
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: var(--font-weight-extrabold);
  color: #fff;
  margin-bottom: var(--space-6);
  line-height: var(--line-height-tight);
}

.vacancy-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}

.vacancy-detail__meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}

.vacancy-detail__salary {
  color: var(--color-secondary);
  font-weight: var(--font-weight-semibold);
}

.vacancy-detail__body {
  padding-top: var(--space-12);
  padding-bottom: var(--space-16);
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-12);
  align-items: start;
}

.vacancy-detail__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

.vacancy-detail__section-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-border);
}

.vacancy-detail__summary {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.vacancy-detail__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.vacancy-detail__list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.vacancy-detail__check {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 3px;
}

.vacancy-detail__benefit-icon {
  flex-shrink: 0;
  font-size: 1rem;
  margin-top: 1px;
}

.vacancy-detail__tags-section {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-6);
}

.vacancy-detail__tags-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.vacancy-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.vacancy-detail__tag {
  font-size: var(--font-size-sm) !important;
  padding: var(--space-2) var(--space-3) !important;
}

.vacancy-detail__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: sticky;
  top: calc(var(--header-height) + var(--space-6));
}

.vacancy-detail__apply-card {
  background: var(--color-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  text-align: center;
}

.vacancy-detail__apply-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.vacancy-detail__apply-desc {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--line-height-relaxed);
}

.vacancy-detail__apply-btn {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: var(--color-text-primary);
  justify-content: center;
  width: 100%;
}

.vacancy-detail__apply-btn:hover {
  background: var(--color-secondary-dark);
  border-color: var(--color-secondary-dark);
}

.vacancy-detail__apply-email {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: underline;
}

.vacancy-detail__info-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
}

.vacancy-detail__info-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.vacancy-detail__dl {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.vacancy-detail__dl-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
}

.vacancy-detail__dl-row dt {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.vacancy-detail__dl-row dd {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-align: right;
}

.vacancy-detail__dl-salary {
  color: var(--color-primary) !important;
  font-weight: var(--font-weight-bold) !important;
}

.vacancy-detail__back-btn {
  width: 100%;
  justify-content: center;
}

.vacancy-detail__not-found {
  padding: var(--space-24) 0;
}

.vacancy-detail__not-found-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
}

.vacancy-detail__not-found-icon {
  font-size: 4rem;
}

.vacancy-detail__not-found-inner h1 {
  font-size: var(--font-size-3xl);
}

.vacancy-detail__not-found-inner p {
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .vacancy-detail__body {
    grid-template-columns: 1fr;
  }

  .vacancy-detail__sidebar {
    position: static;
    order: -1;
  }
}

@media (max-width: 640px) {
  .vacancy-detail__meta {
    gap: var(--space-3);
  }
}
</style>
