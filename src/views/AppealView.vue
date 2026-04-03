<template>
  <main class="appeal">
    <div class="container">
      <header class="appeal__header">
        <h1 class="appeal__title">Електронне звернення</h1>
        <p class="appeal__subtitle">
          Надішліть звернення до ДП «Цифрове». Ви можете додати файл-додаток (за потреби).
        </p>
      </header>

      <form class="appeal__form card" @submit.prevent="submit">
        <div class="grid">
          <label class="field">
            <span class="field__label">ПІБ *</span>
            <input
              v-model.trim="form.fullName"
              class="input"
              type="text"
              autocomplete="name"
              required
            />
          </label>

          <label class="field">
            <span class="field__label">Email *</span>
            <input
              v-model.trim="form.email"
              class="input"
              type="email"
              autocomplete="email"
              required
            />
          </label>

          <label class="field">
            <span class="field__label">Телефон</span>
            <input
              v-model.trim="form.phone"
              class="input"
              type="tel"
              autocomplete="tel"
              placeholder="+380…"
            />
          </label>

          <label class="field">
            <span class="field__label">Тема *</span>
            <input v-model.trim="form.subject" class="input" type="text" required />
          </label>

          <label class="field field--full">
            <span class="field__label">Текст звернення *</span>
            <textarea v-model.trim="form.message" class="textarea" rows="7" required></textarea>
          </label>

          <div class="field field--full">
            <span class="field__label">Додаток (файл)</span>

            <div class="filebox">
              <input
                ref="fileInputEl"
                class="filebox__input"
                type="file"
                :accept="ACCEPT"
                @change="onFileChange"
              />

              <div class="filebox__meta">
                <p class="filebox__name">
                  <strong>Файл:</strong>
                  <span v-if="file">{{ file.name }} ({{ prettyBytes(file.size) }})</span>
                  <span v-else>не обрано</span>
                </p>

                <p class="filebox__hint">
                  Дозволено: PDF, DOC, DOCX, JPG, PNG. Максимум: {{ prettyBytes(MAX_FILE_SIZE) }}.
                </p>

                <div class="filebox__actions">
                  <button class="btn btn--outline btn--sm" type="button" @click="pickFile">
                    Обрати файл
                  </button>
                  <button
                    class="btn btn--outline btn--sm"
                    type="button"
                    :disabled="!file"
                    @click="clearFile"
                  >
                    Прибрати
                  </button>
                </div>

                <p v-if="fileError" class="alert alert--error alert--compact">
                  {{ fileError }}
                </p>
              </div>
            </div>
          </div>

          <label class="field field--full checkbox">
            <input v-model="form.consent" type="checkbox" required />
            <span>Погоджуюсь на обробку персональних даних з метою розгляду звернення. *</span>
          </label>

          <p class="field field--full field__hint">
            Натискаючи “Надіслати”, ви формуєте звернення для ДП «Цифрове». (Наразі відправка працює
            в демо-режимі.)
          </p>
        </div>

        <div class="appeal__actions">
          <button class="btn btn--primary" type="submit" :disabled="submitting || !canSubmit">
            {{ submitting ? 'Надсилання…' : 'Надіслати' }}
          </button>
          <RouterLink class="btn btn--outline" to="/contacts">Контакти</RouterLink>
        </div>

        <p v-if="status === 'success'" class="alert alert--success">
          Звернення надіслано (демо). Дякуємо!
        </p>
        <p v-else-if="status === 'error'" class="alert alert--error">
          Не вдалося надіслати звернення. Спробуйте ще раз.
        </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png'

const submitting = ref(false)
const status = ref('idle') // idle | success | error

const fileInputEl = ref(null)
const file = ref(null) // File | null
const fileError = ref('')

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
})

const canSubmit = computed(() => {
  if (fileError.value) return false
  return true
})

function pickFile() {
  fileInputEl.value?.click()
}

function clearFile() {
  file.value = null
  fileError.value = ''
  if (fileInputEl.value) fileInputEl.value.value = ''
}

function onFileChange(e) {
  fileError.value = ''
  const picked = e.target.files?.[0] ?? null

  if (!picked) {
    file.value = null
    return
  }

  if (picked.size > MAX_FILE_SIZE) {
    file.value = null
    fileError.value = `Файл завеликий. Максимальний розмір: ${prettyBytes(MAX_FILE_SIZE)}.`
    return
  }

  const name = picked.name.toLowerCase()
  const okExt = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'].some((ext) => name.endsWith(ext))
  if (!okExt) {
    file.value = null
    fileError.value = 'Недопустимий формат файлу. Дозволено: PDF, DOC, DOCX, JPG, PNG.'
    return
  }

  file.value = picked
}

function reset() {
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
  form.consent = false
  clearFile()
}

function buildFormData() {
  const fd = new FormData()
  fd.append('fullName', form.fullName)
  fd.append('email', form.email)
  fd.append('phone', form.phone)
  fd.append('subject', form.subject)
  fd.append('message', form.message)
  fd.append('consent', String(form.consent))
  if (file.value) fd.append('attachment', file.value, file.value.name)
  return fd
}

async function submit() {
  status.value = 'idle'
  submitting.value = true

  try {
    // Ready for backend:
    // const fd = buildFormData()
    // await fetch('/api/appeal', { method: 'POST', body: fd })
    buildFormData()
    await new Promise((r) => setTimeout(r, 700))

    status.value = 'success'
    reset()
  } catch (e) {
    status.value = 'error'
  } finally {
    submitting.value = false
  }
}

function prettyBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let v = bytes
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}
</script>

<style scoped>
.appeal {
  padding: var(--space-10) 0 var(--space-16);
}

.appeal__header {
  margin-bottom: var(--space-8);
}

.appeal__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-extrabold);
  margin-bottom: var(--space-3);
}

.appeal__subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  max-width: 72ch;
}

.card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field--full {
  grid-column: 1 / -1;
}

.field__label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.field__hint {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.input,
.textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  outline: none;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.textarea {
  resize: vertical;
}

.input:focus,
.textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(0, 87, 184, 0.12);
}

.filebox {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-xl);
  background: rgba(0, 0, 0, 0.02);
}

.filebox__input {
  display: none;
}

.filebox__meta {
  display: grid;
  gap: var(--space-2);
}

.filebox__name {
  margin: 0;
}

.filebox__hint {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.filebox__actions {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.appeal__actions {
  margin-top: var(--space-6);
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.checkbox {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-3);
}

.alert {
  margin-top: var(--space-5);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
}

.alert--compact {
  margin-top: var(--space-2);
  padding: var(--space-3);
}

.alert--success {
  background: rgba(46, 160, 67, 0.12);
  border: 1px solid rgba(46, 160, 67, 0.3);
  color: #1a7f37;
}

.alert--error {
  background: rgba(248, 81, 73, 0.12);
  border: 1px solid rgba(248, 81, 73, 0.3);
  color: #cf222e;
}

@media (max-width: 900px) {
  .card {
    padding: var(--space-6);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
