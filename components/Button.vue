<template>
  <nuxt-link v-if="to" :to="to" class="cta" :class="variant">
    <slot>{{ text }}</slot>
    <span v-if="arrow" class="cta-arrow" aria-hidden="true">&rarr;</span>
  </nuxt-link>
  <a v-else-if="href" :href="href" class="cta" :class="variant">
    <slot>{{ text }}</slot>
    <span v-if="arrow" class="cta-arrow" aria-hidden="true">&rarr;</span>
  </a>
  <button v-else :type="type" :disabled="disabled" class="cta" :class="variant" @click="$emit('click', $event)">
    <slot>{{ text }}</slot>
    <span v-if="arrow" class="cta-arrow" aria-hidden="true">&rarr;</span>
  </button>
</template>

<script setup>
defineProps({
  to: { type: String, default: null },
  href: { type: String, default: null },
  text: { type: String, default: '' },
  arrow: { type: Boolean, default: false },
  variant: { type: String, default: 'outline' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<style scoped lang="scss">
.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.7em 1.3em;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0;
  color: var(--fg);
  background: transparent;
  border: 1px solid var(--fg);
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    outline: none;
    background: var(--fg);
    color: var(--bg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.solid {
    background: var(--fg);
    color: var(--bg);

    &:hover,
    &:focus-visible {
      background: transparent;
      color: var(--fg);
    }
  }

  &.subtle {
    border-color: var(--border-faint);

    &:hover,
    &:focus-visible {
      border-color: var(--fg);
      background: transparent;
      color: var(--fg);
    }
  }
}

.cta-arrow {
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.cta:hover .cta-arrow,
.cta:focus-visible .cta-arrow {
  transform: translateX(0.25em);
}
</style>
