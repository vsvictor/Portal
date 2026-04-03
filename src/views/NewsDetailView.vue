<template>
  <div class="news-detail">
    <div v-if="article" class="news-detail__wrap">
      <div class="news-detail__hero">
        <div class="container">
          <RouterLink to="/#news" class="news-detail__back">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Повернутися до новин
          </RouterLink>

          <div class="news-detail__meta">
            <span class="badge badge--primary">{{ article.category }}</span>
            <time :datetime="article.date" class="news-detail__date">{{ formatDate(article.date) }}</time>
          </div>

          <h1 class="news-detail__title">{{ article.title }}</h1>
          <p class="news-detail__summary">{{ article.summary }}</p>
        </div>
      </div>

      <div class="container news-detail__body">
        <div class="news-detail__content">
          <p v-for="(para, i) in paragraphs" :key="i" class="news-detail__para">{{ para }}</p>
        </div>

        <div class="news-detail__footer">
          <div class="news-detail__share">
            <p class="news-detail__share-label">Поділитися:</p>
            <div class="news-detail__share-btns">
              <button class="news-detail__share-btn" aria-label="Копіювати посилання" @click="copyLink">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path
                    d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                  />
                </svg>
                {{ copied ? 'Скопійовано!' : 'Копіювати посилання' }}
              </button>
            </div>
          </div>

          <RouterLink to="/#news" class="btn btn--outline">← Усі новини</RouterLink>
        </div>

        <div v-if="otherNews.length" class="news-detail__related">
          <h2 class="news-detail__related-title">Інші новини</h2>
          <div class="news-detail__related-grid">
            <RouterLink
              v-for="item in otherNews"
              :key="item.id"
              :to="`/news/${item.id}`"
              class="news-detail__related-card"
            >
              <span class="badge badge--primary">{{ item.category }}</span>
              <p class="news-detail__related-card-title">{{ item.title }}</p>
              <span class="news-detail__related-date">{{ formatDate(item.date) }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="news-detail__not-found">
      <div class="container">
        <div class="news-detail__not-found-inner">
          <span class="news-detail__not-found-icon">📰</span>
          <h1>Новину не знайдено</h1>
          <p>На жаль, новину з таким ідентифікатором не знайдено.</p>
          <RouterLink to="/#news" class="btn btn--primary">Повернутися до новин</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { news } from '@/data/news.js'

const route = useRoute()
const copied = ref(false)

const article = computed(() => news.find((n) => n.id === Number(route.params.id)) ?? null)

const paragraphs = computed(() =>
  article.value ? article.value.content.split('\n\n').filter(Boolean) : []
)

const otherNews = computed(() =>
  article.value ? news.filter((n) => n.id !== article.value.id).slice(0, 3) : []
)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // fallback silently
  }
}
</script>

<style scoped>
.news-detail__hero {
  background: linear-gradient(135deg, #0f2d5a 0%, #1a56a4 100%);
  padding: var(--space-12) 0 var(--space-16);
  color: #fff;
}

.news-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-8);
  transition: color var(--transition-fast);
}

.news-detail__back:hover {
  color: #fff;
}

.news-detail__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.news-detail__date {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.65);
}

.news-detail__title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: var(--font-weight-extrabold);
  color: #fff;
  margin-bottom: var(--space-5);
  line-height: var(--line-height-tight);
  max-width: 800px;
}

.news-detail__summary {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--line-height-relaxed);
  max-width: 700px;
}

.news-detail__body {
  padding-top: var(--space-12);
  padding-bottom: var(--space-16);
  max-width: 800px;
}

.news-detail__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--space-10);
}

.news-detail__para {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.news-detail__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
  margin-bottom: var(--space-12);
}

.news-detail__share {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.news-detail__share-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.news-detail__share-btns {
  display: flex;
  gap: var(--space-2);
}

.news-detail__share-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-bg-primary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.news-detail__share-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.news-detail__related {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-10);
}

.news-detail__related-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-6);
}

.news-detail__related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.news-detail__related-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.news-detail__related-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.news-detail__related-card-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug);
  flex: 1;
}

.news-detail__related-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.news-detail__not-found {
  padding: var(--space-24) 0;
}

.news-detail__not-found-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
}

.news-detail__not-found-icon {
  font-size: 4rem;
}

.news-detail__not-found-inner h1 {
  font-size: var(--font-size-3xl);
}

.news-detail__not-found-inner p {
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .news-detail__related-grid {
    grid-template-columns: 1fr;
  }

  .news-detail__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
