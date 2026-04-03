<template>
  <section id="contacts" class="section">
    <div class="container">
      <div class="section__header">
        <span class="section__eyebrow">Контакти</span>
      </div>

      <div class="contacts__layout">
        <div class="contacts__info">
          <div v-for="info in contactInfo" :key="info.label" class="contacts__info-card">
            <div class="contacts__info-icon">{{ info.icon }}</div>
            <div>
              <p class="contacts__info-label">{{ info.label }}</p>
              <component
                :is="info.href ? 'a' : 'p'"
                :href="info.href"
                class="contacts__info-value"
                :class="{ 'contacts__info-link': info.href }"
              >
                {{ info.value }}
              </component>
            </div>
          </div>

          <div class="contacts__hours">
            <h3 class="contacts__hours-title">Режим роботи</h3>
            <div class="contacts__hours-grid">
              <div class="contacts__hours-row">
                <span>Понеділок — п'ятниця</span>
                <span class="contacts__hours-time">09:00 — 18:00</span>
              </div>
              <div class="contacts__hours-row">
                <span>Субота — неділя</span>
                <span class="contacts__hours-time contacts__hours-closed">Вихідний</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contactInfo = [
  {
    icon: '📍',
    label: 'Адреса',
    value: '01133, м. Київ, бульвар Лесі Українки, 26',
    href: null,
  },
  {
    icon: '📞',
    label: 'Телефон',
    value: '+38 (044) 200-00-00',
    href: 'tel:+380442000000',
  },
  {
    icon: '📧',
    label: 'Електронна пошта',
    value: 'info@digital.gov.ua',
    href: 'mailto:info@digital.gov.ua',
  },
  {
    icon: '🏛️',
    label: 'Засновник',
    value: 'Міністерство економіки України',
    href: null,
  },
]
</script>

<style scoped>
.contacts__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: start;
}

.contacts__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contacts__info-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.contacts__info-icon {
  font-size: 1.5rem;
  width: 40px;
  flex-shrink: 0;
  text-align: center;
}

.contacts__info-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-1);
}

.contacts__info-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.contacts__info-link {
  color: var(--color-primary);
  transition: color var(--transition-fast);
}

.contacts__info-link:hover {
  color: var(--color-primary-dark);
}

.contacts__hours {
  padding: var(--space-5);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.contacts__hours-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.contacts__hours-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contacts__hours-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.contacts__hours-time {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  flex: 1;
  justify-content: flex-start;
  margin-left: 16pt;
}

.contacts__hours-closed {
  color: var(--color-text-muted);
}
</style>
