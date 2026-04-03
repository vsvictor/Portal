<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container footer__grid">
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo">
            <img src="@/assets/logo.svg" alt="ДП «Цифрове»" width="160" height="48" />
          </RouterLink>
          <p class="footer__tagline">
            Державне підприємство з розробки та підтримки інформаційних систем Міністерства
            економіки України
          </p>
          <div class="footer__social">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              class="footer__social-link"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="footer__social-link"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="footer__col">
          <h3 class="footer__col-title">Навігація</h3>
          <ul class="footer__links">
            <li><a href="/#about" class="footer__link">Про підприємство</a></li>
            <li><a href="/#services" class="footer__link">Наші послуги</a></li>
            <li><a href="/#projects" class="footer__link">Проєкти</a></li>
            <li><a href="/#news" class="footer__link">Новини</a></li>
            <li><a href="/#vacancies" class="footer__link">Вакансії</a></li>
            <li><a href="/#contacts" class="footer__link">Контакти</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h3 class="footer__col-title">Послуги</h3>
          <ul class="footer__links">
            <li><span class="footer__link">Розробка ПЗ</span></li>
            <li><span class="footer__link">Технічна підтримка</span></li>
            <li><span class="footer__link">Кібербезпека</span></li>
            <li><span class="footer__link">Хмарна інфраструктура</span></li>
            <li><span class="footer__link">Системна інтеграція</span></li>
            <li><span class="footer__link">BI та аналітика</span></li>
          </ul>
        </div>

        <div class="footer__col">
          <h3 class="footer__col-title">Контакти</h3>
          <ul class="footer__contacts">
            <li class="footer__contact-item">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>01133, м. Київ, бульвар Лесі Українки, 26</span>
            </li>
            <li class="footer__contact-item">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.92 12 19.79 19.79 0 0 1 1.87 3.4 2 2 0 0 1 3.84 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              <a href="tel:+380442000000" class="footer__link">+38 (044) 200-00-00</a>
            </li>
            <li class="footer__contact-item">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:info@digital.gov.ua" class="footer__link">info@digital.gov.ua</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__copy">
          © {{ currentYear }} ДП «Цифрове». Усі права захищені.
        </p>
        <p class="footer__legal">
          Державне підприємство, засноване на державній власності, підпорядковане Міністерству
          економіки України
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-bg-dark);
  color: #a0aec0;
}

.footer__top {
  padding: var(--space-16) 0 var(--space-12);
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--space-10);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer__logo img {
  filter: brightness(0) invert(1);
  opacity: 0.9;
}

.footer__tagline {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: #718096;
  max-width: 280px;
}

.footer__social {
  display: flex;
  gap: var(--space-3);
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.08);
  color: #a0aec0;
  transition: all var(--transition-fast);
}

.footer__social-link:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-2px);
}

.footer__col-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-4);
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer__link {
  font-size: var(--font-size-sm);
  color: #718096;
  transition: color var(--transition-fast);
  cursor: pointer;
}

a.footer__link:hover {
  color: #fff;
}

.footer__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: #718096;
}

.footer__contact-item svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-primary-light);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: var(--space-6) 0;
}

.footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer__copy {
  font-size: var(--font-size-sm);
  color: #718096;
}

.footer__legal {
  font-size: var(--font-size-xs);
  color: #4a5568;
  text-align: right;
  max-width: 400px;
}

@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
}

@media (max-width: 640px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__legal {
    text-align: left;
  }
}
</style>
