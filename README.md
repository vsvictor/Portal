# ДП «Цифрове» — Офіційний Портал

Головний веб-портал державного підприємства «Цифрове» — розробника та підтримувача інформаційних систем Міністерства економіки України.

## 🚀 Технології

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 5** — збирач проєкту
- **Vue Router 4** — маршрутизація
- **CSS Custom Properties** — дизайн-система
- **ESLint + Prettier** — якість коду

## 📋 Вимоги

- Node.js >= 18
- npm >= 9

## ⚙️ Встановлення та запуск

```bash
# Клонувати репозиторій
git clone https://github.com/vsvictor/Portal.git
cd Portal

# Встановити залежності
npm install

# Запустити у режимі розробки
npm run dev

# Відкрити http://localhost:5173
```

## 🏗️ Команди

| Команда           | Опис                                         |
|-------------------|----------------------------------------------|
| `npm run dev`     | Запуск dev-сервера (http://localhost:5173)   |
| `npm run build`   | Збірка production версії у папку `dist/`    |
| `npm run preview` | Попередній перегляд production збірки        |
| `npm run lint`    | Перевірка та виправлення коду (ESLint)       |
| `npm run format`  | Форматування коду (Prettier)                 |

## 📁 Структура проєкту

```
src/
├── assets/
│   ├── logo.svg          # SVG-логотип підприємства
│   └── styles/
│       └── main.css      # Глобальні стилі та CSS-змінні
├── components/
│   ├── AppHeader.vue     # Шапка сайту
│   ├── AppFooter.vue     # Підвал сайту
│   ├── HeroSection.vue   # Hero-секція
│   ├── AboutSection.vue  # Про підприємство
│   ├── ServicesSection.vue   # Послуги
│   ├── ProjectsSection.vue   # Проєкти/Рішення
│   ├── NewsSection.vue       # Новини
│   ├── VacanciesSection.vue  # Вакансії
│   └── ContactsSection.vue   # Контакти
├── data/
│   ├── news.js           # Дані новин (mock)
│   └── vacancies.js      # Дані вакансій (mock)
├── router/
│   └── index.js          # Маршрутизація
├── views/
│   ├── HomeView.vue          # Головна сторінка
│   ├── NewsDetailView.vue    # Деталі новини
│   └── VacancyDetailView.vue # Деталі вакансії
├── App.vue               # Кореневий компонент
└── main.js               # Точка входу
```

## 🎨 Дизайн-система

Портал використовує єдину дизайн-систему на основі CSS Custom Properties:

- **Кольори**: синій `#1a56a4` та жовтий `#f5c400` (державна символіка України)
- **Типографіка**: Inter / system fonts
- **Адаптивність**: mobile-first підхід, брейкпоінти 768px / 1024px / 1280px
- **Доступність**: ARIA-атрибути, keyboard navigation, контраст WCAG AA

## 📍 Контакти підприємства

- **Адреса**: м. Київ, бульвар Лесі Українки, 26
- **Телефон**: +38 (044) 123-45-67
- **Email**: info@digital.gov.ua

## 📄 Ліцензія

© 2024 ДП «Цифрове». Всі права захищені.
