<template>
  <div class="homepage-testimonials">
    <article
      v-for="(t, i) in testimonials"
      :key="t.company"
      class="quote"
      :class="`quote-${i % 2 === 0 ? 'left' : 'right'}`"
    >
      <header class="quote-head">
        <img :src="t.logo" :alt="t.company" class="quote-logo" />
        <span class="quote-index">{{ String(i + 1).padStart(2, '0') }} / {{ String(testimonials.length).padStart(2, '0') }}</span>
      </header>

      <WordReveal
        tag="blockquote"
        class="quote-body"
        :text="t.quote"
        :stagger="70"
        :duration="950"
      />

      <footer class="quote-attr">
        <span class="quote-metric">{{ t.metric }}</span>
        <span class="quote-role">{{ t.role }}, {{ t.company }}</span>
      </footer>
    </article>
  </div>
</template>

<script setup>
const testimonials = [
  {
    company: 'IBM',
    logo: '/clients/ibm.png',
    quote: 'The onboarding redesign lifted enterprise activation by 38% in a single quarter.',
    metric: '+38% activation',
    role: 'Director of Product Design',
  },
  {
    company: 'NVIDIA',
    logo: '/clients/nvidia.png',
    quote: 'Designer-to-engineer handoff time dropped by more than half after the system work.',
    metric: '−60% handoff time',
    role: 'Principal UX Lead',
  },
  {
    company: 'Wix',
    logo: '/clients/wix.png',
    quote: 'A shared component library cut new page build time roughly in half across the platform team.',
    metric: '−48% build time',
    role: 'Head of Design Platform',
  },
  {
    company: 'Ultra',
    logo: '/clients/ultra.png',
    quote: 'The tokenised storefront shipped on schedule and weekly active users climbed 22% in the first month.',
    metric: '+22% WAU',
    role: 'VP of Product',
  },
  {
    company: 'Tonara',
    logo: '/clients/tonara.png',
    quote: 'Parent retention rose 27% after the practice loop was restructured around the learner, not the lesson.',
    metric: '+27% retention',
    role: 'Chief Product Officer',
  },
  {
    company: 'Qmarkets',
    logo: '/clients/qmarkets.png',
    quote: 'Innovation submissions doubled in the first quarter after we reframed the capture flow.',
    metric: '2× submissions',
    role: 'Head of Innovation',
  },
]
</script>

<style lang="scss" scoped>
.homepage-testimonials {
  display: flex;
  flex-direction: column;
  gap: clamp($spacing-xl, 16vh, $spacing-xxl);
  width: 100%;
}

.quote {
  display: flex;
  flex-direction: column;
  gap: clamp($spacing-md, 5vh, $spacing-lg);
  max-width: min(100%, 70rem);

  &.quote-left {
    align-self: flex-start;
    text-align: left;
  }

  &.quote-right {
    align-self: flex-end;
    text-align: right;

    .quote-head {
      flex-direction: row-reverse;
    }

    .quote-attr {
      align-items: flex-end;
      text-align: right;
    }
  }
}

.quote-head {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.quote-logo {
  /* Half the previous size per design spec */
  height: clamp(1rem, 1.75vw, 1.5rem);
  width: auto;
  max-width: 6rem;
  object-fit: contain;
  opacity: 0.95;
  /* Light mode: invert source art (which ships white-for-dark-bg) so the
     logo reads as dark on light. Dark mode: force-white fill. */
  filter: invert(1);
}

/* Vue scoped styles still let descendant-selectors from un-scoped ancestors
   like `body` match, because the scoped attribute is appended to the
   rightmost compound selector only. */
body.dark .quote-logo {
  filter: brightness(0) invert(1);
}

.quote-index {
  font-family: $font-family-serif, serif;
  font-style: italic;
  font-size: $font-size-sm;
  letter-spacing: 0.15em;
  opacity: 0.55;
  text-transform: uppercase;
}

.quote-body {
  margin: 0;
  padding: 0;
  font-family: $font-family-serif, serif;
  font-weight: 300;
  font-style: normal;
  font-size: clamp(2rem, 4.5vw, 4.25rem);
  line-height: 1.08;
  letter-spacing: -0.015em;
  max-width: 22ch;
  color: inherit;

  /* When the row is right-aligned, flow the quote from the right edge. */
  .quote-right & {
    margin-left: auto;
  }
}

.quote-attr {
  display: flex;
  flex-direction: column;
  gap: $spacing-xxs;
}

.quote-metric {
  font-family: $font-family-main, sans-serif;
  font-weight: 300;
  font-size: clamp(1.25rem, 1.8vw, 1.75rem);
  letter-spacing: -0.01em;
}

.quote-role {
  font-size: $font-size-sm;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
}

@media screen and (max-width: 700px) {
  .quote,
  .quote.quote-right {
    align-self: stretch;
    text-align: left;

    .quote-head {
      flex-direction: row;
    }

    .quote-attr {
      align-items: flex-start;
      text-align: left;
    }

    .quote-body {
      margin-left: 0;
      margin-right: 0;
      /* 80% of the desktop clamp (was 2rem / 4.5vw / 4.25rem) so the
         testimonial quotes breathe on narrow viewports. */
      font-size: clamp(1.6rem, 3.6vw, 3.4rem);
    }
  }
}
</style>
