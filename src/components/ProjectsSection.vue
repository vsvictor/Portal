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
            <span class="badge badge--yellow">{{ project.status }}</span>
          </div>
          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="project-card__year">{{ project.year }}</span>
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
const projects = [
  {
    icon: '📋',
    color: 'linear-gradient(135deg, #1a56a4, #2368c4)',
    status: 'Діє',
    year: '2023',
    category: 'ERP система',
    title: 'Єдина інформаційна система Мінекономіки',
    description:
      'Комплексна ERP-система для автоматизації процесів Міністерства економіки. Охоплює документообіг, планування, звітність та аналітику.',
    tags: ['Java', 'Vue.js', 'PostgreSQL', 'Kubernetes'],
  },
  {
    icon: '📊',
    color: 'linear-gradient(135deg, #2d7d46, #38a169)',
    status: 'Діє',
    year: '2022',
    category: 'Аналітика',
    title: 'Система моніторингу держзакупівель',
    description:
      'Аналітична платформа для моніторингу та аналізу державних закупівель з інтеграцією Prozorro. Забезпечує прозорість витрат.',
    tags: ['Python', 'React', 'Elasticsearch', 'Grafana'],
  },
  {
    icon: '🗂️',
    color: 'linear-gradient(135deg, #6b46c1, #805ad5)',
    status: 'Діє',
    year: '2022',
    category: 'Документообіг',
    title: 'Електронний документообіг',
    description:
      "Система електронного документообігу з КЕП-підписанням, маршрутизацією документів та інтеграцією з Мін'юстом.",
    tags: ['Spring Boot', 'КЕП', 'REST API', 'Oracle'],
  },
  {
    icon: '📈',
    color: 'linear-gradient(135deg, #c05621, #dd6b20)',
    status: 'Діє',
    year: '2021',
    category: 'BI',
    title: 'Платформа бізнес-аналітики',
    description:
      'BI-платформа з інтерактивними дашбордами, автоматичними звітами та прогнозною аналітикою для керівництва Мінекономіки.',
    tags: ['Apache Superset', 'dbt', 'Airflow', 'ClickHouse'],
  },
  {
    icon: '🔐',
    color: 'linear-gradient(135deg, #b83280, #d53f8c)',
    status: 'Діє',
    year: '2020',
    category: 'Безпека',
    title: 'Захищений периметр держсистем',
    description:
      'Комплексна система кібербезпеки з SIEM, IDS/IPS, двофакторною автентифікацією та моніторингом загроз.',
    tags: ['SIEM', 'IDS', '2FA', 'Zero Trust'],
  },
]
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

.project-card__year {
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
