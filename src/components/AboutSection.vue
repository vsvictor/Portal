<template>
  <section id="about" class="section section--alt">
    <div class="container">
      <div class="about__layout">
        <div class="about__text">
          <span class="section__eyebrow">Про підприємство</span>
          <h2 class="section__title about__title">
            Провідний державний IT-партнер Міністерства економіки
          </h2>
          <p class="about__desc">
            ДП «Цифрове» — державне підприємство, засноване Міністерством економіки України,
            що спеціалізується на розробці, впровадженні та супроводі інформаційних систем
            державного управління. З 2014 року ми є ключовим технологічним партнером Мінекономіки.
          </p>
          <p class="about__desc">
            Наша місія — забезпечити надійну та сучасну цифрову інфраструктуру для ефективного
            функціонування органів державної влади та надання якісних послуг громадянам України.
          </p>

          <ul class="about__values">
            <li class="about__value-item">
              <span class="about__value-icon">🔒</span>
              <div>
                <strong>Надійність і безпека</strong>
                <p>Відповідність НД ТЗІ, ISO 27001 та державним стандартам захисту інформації</p>
              </div>
            </li>
            <li class="about__value-item">
              <span class="about__value-icon">⚡</span>
              <div>
                <strong>Ефективність</strong>
                <p>Agile-підходи та DevOps-практики для швидкого та якісного результату</p>
              </div>
            </li>
            <li class="about__value-item">
              <span class="about__value-icon">🤝</span>
              <div>
                <strong>Прозорість</strong>
                <p>Відкриті процеси, чітка звітність та дотримання принципів публічного управління</p>
              </div>
            </li>
          </ul>

          <div class="about__actions">
            <RouterLink to="/contacts" class="btn btn--primary">Зв'язатися з нами</RouterLink>
            <RouterLink to="/services" class="btn btn--outline">Наші послуги</RouterLink>
          </div>
        </div>

        <div class="about__stats-panel">
          <div class="about__stats-grid">
            <div v-for="stat in stats" :key="stat.label" class="about__stat-card">
              <span class="about__stat-value">{{ stat.value }}</span>
              <span class="about__stat-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="about__cert">
            <p class="about__cert-title">Сертифікати та стандарти</p>
            <div class="about__cert-list">
              <span class="badge badge--primary">ISO 27001</span>
              <span class="badge badge--primary">ДСТУ ISO 9001</span>
              <span class="badge badge--primary">НД ТЗІ</span>
              <span class="badge badge--primary">КЗЗІ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '2014', label: 'Рік заснування' },
  { value: '12', label: 'Активних систем' },
  { value: '150+', label: 'Фахівців' },
  { value: '30+', label: 'Проєктів' },
  { value: '500+', label: 'Держслужбовців обслуговуємо щодня' },
  { value: '99.9%', label: 'Uptime систем' },
]
</script>

<style scoped>
.about__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

.about__title {
  text-align: left;
  font-size: var(--font-size-3xl);
}

.about__desc {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
}

.about__values {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

.about__value-item {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.about__value-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  border-radius: var(--radius-md);
}

.about__value-item strong {
  display: block;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.about__value-item p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.about__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-6);
}

.about__stats-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.about__stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.about__stat-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  transition: all var(--transition-base);
}

.about__stat-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.about__stat-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-primary);
  line-height: 1;
}

.about__stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-snug);
}

.about__cert {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.about__cert-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about__cert-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@media (max-width: 1024px) {
  .about__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 640px) {
  .about__stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
