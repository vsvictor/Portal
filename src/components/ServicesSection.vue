<template>
  <section id="services" class="section">
    <div class="container">
      <div class="section__header">
        <span class="section__eyebrow">Послуги</span>
        <h2 class="section__title">Що ми робимо</h2>
        <p class="section__subtitle">
          Повний цикл розробки та підтримки державних IT-систем — від аналізу вимог до
          промислової експлуатації
        </p>
      </div>

      <div class="services__grid">
        <div v-for="service in services" :key="service.title" class="service-card">
          <div class="service-card__icon" :style="{ background: service.iconBg }">
            <span class="service-card__emoji">{{ service.icon }}</span>
          </div>
          <h3 class="service-card__title">{{ service.title }}</h3>
          <p class="service-card__desc">{{ service.description }}</p>
          <ul class="service-card__features">
            <li v-for="feat in service.features" :key="feat" class="service-card__feature">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ feat }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: '💻',
    iconBg: '#e8f0fb',
    title: 'Розробка програмного забезпечення',
    description:
      'Повний цикл розробки державних інформаційних систем: від технічного завдання до здачі в експлуатацію.',
    features: [
      'Веб-додатки та API',
      'Мікросервісна архітектура',
      'Agile та Scrum методології',
      'Code review та QA',
    ],
  },
  {
    icon: '🛡️',
    iconBg: '#fef2f2',
    title: 'Кібербезпека та захист даних',
    description:
      'Комплексний захист інформаційних систем відповідно до вимог НД ТЗІ та КЗЗІ.',
    features: [
      'Аудит безпеки систем',
      'Впровадження КЗЗІ',
      'Пентестування',
      'Навчання персоналу',
    ],
  },
  {
    icon: '☁️',
    iconBg: '#f0fdf4',
    title: 'Хмарна інфраструктура та DevOps',
    description:
      'Побудова та обслуговування надійної хмарної інфраструктури з автоматизованим розгортанням.',
    features: [
      'Docker та Kubernetes',
      'CI/CD pipeline',
      'Моніторинг та алертинг',
      'SLA 99.9% uptime',
    ],
  },
  {
    icon: '🔗',
    iconBg: '#fff7ed',
    title: 'Системна інтеграція',
    description:
      'Інтеграція з державними реєстрами, платіжними системами та зовнішніми сервісами.',
    features: [
      "Інтеграція з Мін'юстом",
      'API Prozorro',
      'ДПС та ПФУ',
      'BankID та Дія',
    ],
  },
  {
    icon: '📊',
    iconBg: '#fdf4ff',
    title: 'Аналітика та BI',
    description:
      'Системи бізнес-аналітики та звітності для прийняття управлінських рішень на основі даних.',
    features: [
      'Дашборди в реальному часі',
      'Автозвіти Excel/PDF',
      'Data warehouse',
      'Прогнозна аналітика',
    ],
  },
  {
    icon: '🎓',
    iconBg: '#f0f9ff',
    title: 'Технічна підтримка та навчання',
    description:
      'Цілодобова підтримка систем, навчання держслужбовців та розробка навчальних матеріалів.',
    features: [
      'L1/L2/L3 підтримка',
      'Helpdesk 24/7',
      'Навчальні програми',
      'Технічна документація',
    ],
  },
]
</script>

<style scoped>
.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.service-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.service-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: transparent;
}

.service-card__icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
}

.service-card__emoji {
  font-size: 1.75rem;
}

.service-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  line-height: var(--line-height-snug);
}

.service-card__desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
}

.service-card__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.service-card__feature {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.service-card__feature svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
