<template>
  <section id="contacts" class="section">
    <div class="container">
      <div class="section__header">
        <span class="section__eyebrow">Контакти</span>
        <h2 class="section__title">Зв'яжіться з нами</h2>
        <p class="section__subtitle">
          Ми готові відповісти на ваші запитання та розглянути пропозиції щодо співпраці
        </p>
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
              >{{ info.value }}</component>
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

        <div class="contacts__form-wrap">
          <div v-if="submitted" class="contacts__success">
            <div class="contacts__success-icon">✅</div>
            <h3>Дякуємо за звернення!</h3>
            <p>Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.</p>
            <button class="btn btn--outline" @click="resetForm">Надіслати ще одне</button>
          </div>

          <form v-else class="contacts__form" novalidate @submit.prevent="submitForm">
            <h3 class="contacts__form-title">Форма звернення</h3>

            <div class="contacts__form-grid">
              <div class="form-group">
                <label for="contact-name" class="form-label">Ваше ім'я *</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-error': errors.name }"
                  placeholder="Іван Петренко"
                  autocomplete="name"
                />
                <span v-if="errors.name" class="contacts__error">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label">Електронна пошта *</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-error': errors.email }"
                  placeholder="ivan@example.com"
                  autocomplete="email"
                />
                <span v-if="errors.email" class="contacts__error">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="contact-subject" class="form-label">Тема звернення *</label>
              <select
                id="contact-subject"
                v-model="form.subject"
                class="form-control"
                :class="{ 'is-error': errors.subject }"
              >
                <option value="">Оберіть тему</option>
                <option value="Загальне питання">Загальне питання</option>
                <option value="Технічна підтримка">Технічна підтримка</option>
                <option value="Співпраця та партнерство">Співпраця та партнерство</option>
                <option value="Вакансії та кар'єра">Вакансії та кар'єра</option>
                <option value="Закупівлі">Закупівлі</option>
                <option value="Медіа запит">Медіа запит</option>
              </select>
              <span v-if="errors.subject" class="contacts__error">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="contact-message" class="form-label">Повідомлення *</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                class="form-control"
                :class="{ 'is-error': errors.message }"
                rows="5"
                placeholder="Опишіть ваше питання або пропозицію..."
              ></textarea>
              <span v-if="errors.message" class="contacts__error">{{ errors.message }}</span>
            </div>

            <button type="submit" class="btn btn--primary btn--lg contacts__submit" :disabled="isSubmitting">
              <span v-if="isSubmitting">Надсилання...</span>
              <span v-else>Надіслати звернення</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const submitted = ref(false)
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const contactInfo = [
  {
    icon: '📍',
    label: 'Адреса',
    value: '01001, м. Київ, вул. Грушевського, 12/2',
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

function validate() {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = "Будь ласка, введіть ваше ім'я"
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Будь ласка, введіть електронну пошту'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Введіть коректну електронну пошту'
    valid = false
  }

  if (!form.subject) {
    errors.subject = 'Будь ласка, оберіть тему звернення'
    valid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Будь ласка, введіть повідомлення'
    valid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Повідомлення має містити щонайменше 10 символів'
    valid = false
  }

  return valid
}

async function submitForm() {
  if (!validate()) return

  isSubmitting.value = true

  // Save to localStorage
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
  submissions.push({
    ...form,
    timestamp: new Date().toISOString(),
  })
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions))

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  isSubmitting.value = false
  submitted.value = true
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''
  submitted.value = false
}
</script>

<style scoped>
.contacts__layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
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
}

.contacts__hours-closed {
  color: var(--color-text-muted);
}

.contacts__form-wrap {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
}

.contacts__form-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
}

.contacts__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.contacts__form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

.contacts__error {
  font-size: var(--font-size-xs);
  color: var(--color-error);
  margin-top: var(--space-1);
}

.contacts__submit {
  width: 100%;
  justify-content: center;
}

.contacts__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.contacts__success {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.contacts__success-icon {
  font-size: 3rem;
}

.contacts__success h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.contacts__success p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 320px;
  line-height: var(--line-height-relaxed);
}

@media (max-width: 1024px) {
  .contacts__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .contacts__form-grid {
    grid-template-columns: 1fr;
  }

  .contacts__form-wrap {
    padding: var(--space-5);
  }
}
</style>
