<template>
  <div>
    <HeroSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
</script>

<style scoped>
.promo-cta {
  padding: var(--space-12) 0 var(--space-16);
}

.promo-cta__inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--space-10);
  align-items: start;
}

.promo-cta__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-extrabold);
  margin-bottom: var(--space-4);
}

.promo-cta__desc {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.promo-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .promo-cta__inner {
    grid-template-columns: 1fr;
  }

  .promo-cta__actions {
    justify-content: flex-start;
  }
}
</style>
