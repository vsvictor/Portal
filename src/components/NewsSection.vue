<template>
  <section id="news" class="section">
    <div class="container">
      <div class="section__header">
        <span class="section__eyebrow">Новини</span>
        <h2 class="section__title">Останні новини</h2>
        <p class="section__subtitle">
          Актуальна інформація про діяльність підприємства, нові проєкти та події
        </p>
      </div>

      <div class="news__grid">
        <article
          v-for="item in latestNews"
          :key="item.id"
          class="news-card"
        >
          <div class="news-card__top">
            <span class="badge badge--primary">{{ item.category }}</span>
            <time class="news-card__date" :datetime="item.date">{{ formatDate(item.date) }}</time>
          </div>
          <h3 class="news-card__title">{{ item.title }}</h3>
          <p class="news-card__summary">{{ item.summary }}</p>
          <RouterLink :to="`/news/${item.id}`" class="news-card__link">
            Читати далі
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </RouterLink>
        </article>
      </div>

      <div class="news__more">
        <p class="news__more-text">Усього {{ news.length }} новини у нашому архіві</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { news } from '@/data/news.js'

const latestNews = computed(() => news.slice(0, 3))

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<style scoped>
.news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.news-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: all var(--transition-base);
}

.news-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: transparent;
}

.news-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.news-card__date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.news-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug);
}

.news-card__summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  transition: gap var(--transition-fast);
  margin-top: auto;
}

.news-card__link:hover {
  gap: var(--space-3);
}

.news__more {
  text-align: center;
}

.news__more-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .news__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .news__grid {
    grid-template-columns: 1fr;
  }
}
</style>
