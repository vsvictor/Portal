<template>
  <section id="hero" class="hero">
    <div class="hero__bg">
      <div class="hero__circle hero__circle--1"></div>
      <div class="hero__circle hero__circle--2"></div>
      <div class="hero__circle hero__circle--3"></div>
      <div class="hero__grid"></div>
    </div>

    <div class="container hero__content">
      <div class="hero__badge animate-fade-in-up">
        <span class="hero__badge-dot"></span>
        Державне підприємство «Цифрове»
      </div>

      <h1 class="hero__title animate-fade-in-up delay-100">
        Цифрова трансформація<br />
        <span class="hero__title-accent">державних послуг</span>
      </h1>

      <p class="hero__subtitle animate-fade-in-up delay-200">
        Розробляємо та супроводжуємо критично важливі інформаційні системи
        Міністерства економіки України. Ваша держава — цифрова.
      </p>

      <div class="hero__actions animate-fade-in-up delay-300">
        <a href="#services" class="btn btn--secondary btn--lg">Наші послуги</a>
        <a href="#contacts" class="btn btn--outline-white btn--lg">Зв'язатися з нами</a>
      </div>

      <div class="hero__stats animate-fade-in-up delay-400">
        <div class="hero__stat">
          <span class="hero__stat-value">10+</span>
          <span class="hero__stat-label">років досвіду</span>
        </div>
        <div class="hero__stat-divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-value">30+</span>
          <span class="hero__stat-label">реалізованих проєктів</span>
        </div>
        <div class="hero__stat-divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-value">150+</span>
          <span class="hero__stat-label">фахівців у команді</span>
        </div>
        <div class="hero__stat-divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-value">99.9%</span>
          <span class="hero__stat-label">uptime систем</span>
        </div>
      </div>
    </div>

    <a href="#about" class="hero__scroll" aria-label="Прокрутити вниз">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </a>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - var(--header-height));
  background: linear-gradient(135deg, #0f2d5a 0%, #1a56a4 50%, #2368c4 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #fff;
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.06;
  background: #fff;
}

.hero__circle--1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
}

.hero__circle--2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  left: -100px;
  opacity: 0.04;
}

.hero__circle--3 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: 20%;
  opacity: 0.08;
  background: var(--color-secondary);
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-top: var(--space-20);
  padding-bottom: var(--space-20);
  max-width: 820px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  animation: pulse 2s ease infinite;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-extrabold);
  line-height: 1.15;
  margin-bottom: var(--space-6);
  color: #fff;
}

.hero__title-accent {
  color: var(--color-secondary);
}

.hero__subtitle {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-relaxed);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-8);
  max-width: 600px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-16);
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
  padding: var(--space-6) var(--space-8);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(8px);
  width: fit-content;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.hero__stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-secondary);
  line-height: 1;
}

.hero__stat-label {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.65);
  white-space: nowrap;
}

.hero__stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInUp 1s ease 0.8s both;
  transition: color var(--transition-fast);
}

.hero__scroll:hover {
  color: #fff;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 768px) {
  .hero__content {
    padding-top: var(--space-12);
    padding-bottom: var(--space-16);
  }

  .hero__stats {
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5);
  }

  .hero__stat-divider {
    height: 30px;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
