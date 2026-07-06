<template>
  <section class="work-timeline">
    <div
      class="timeline-inner"
      :style="{ '--total-h': totalHeight + 'px' }"
    >
      <span
        class="timeline-trunk"
        :style="{ top: trunkTop + 'px', height: trunkHeight + 'px' }"
        aria-hidden="true"
      ></span>

      <nuxt-link
        v-for="n in items"
        :key="n.type + n.slug"
        class="tl-item"
        :class="[n.side === 'left' ? 'label-left' : 'label-right', 'is-' + n.type]"
        :style="{ '--y': n.y + 'px', '--accent': n.color }"
        :to="n.slug"
        :aria-label="n.title"
      >
        <svg class="tl-branch" viewBox="0 0 60 44" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,22 Q30,8 60,22" fill="none" />
        </svg>
        <span class="tl-node" aria-hidden="true"></span>

        <div class="tl-label">
          <span class="tl-tags">
            <span class="tl-pill">{{ n.type === 'project' ? 'Project' : 'Article' }}</span>
            <span class="tl-date">{{ n.displayDate }}</span>
          </span>
          <h3 class="tl-title">{{ n.title }}</h3>
          <p class="tl-what">{{ n.blurb }}</p>
        </div>

        <div class="tl-image" :class="'is-' + n.media">
          <NuxtImg
            :src="n.image"
            :alt="n.title"
            sizes="sm:80vw md:50vw lg:60vw"
            loading="lazy"
            format="webp"
          />
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { products } from '~/utils/products'
import articles from '~/assets/articles.json'

// Row heights per type drive the vertical rhythm; projects get more room than
// articles so the big, off-bleeding project images never collide.
const PROJECT_ROW = 620
const ARTICLE_ROW = 380

// Contrasting type colors drive the dot, branch, and pill.
const TYPE_COLORS = { project: '#0FB9B1', article: '#E8590C' }

// Projects with their real timeline data. `start` (YYYY-MM) sorts them against
// the articles; `period` is the human label; `media` sizes the floating image.
const PROJECTS = [
  { slug: '/products/sprawl/',          start: '2026-06', period: 'Jun 2026 to present', media: 'lg', blurb: 'A native macOS dev environment on one infinite canvas, where live terminals and code editors sit side by side, grouped by project.' },
  { slug: '/products/sessionsight/',    start: '2026-02', period: 'Feb 2026 to present', media: 'md', blurb: 'An all-in-one growth platform that connects marketing to real product insight: session replays, heatmaps, funnels, and feedback.' },
  { slug: '/products/miserably-unemployed/', start: '2026-01', period: 'Jan 2026 to present', media: 'md', blurb: 'A SaaS for laid-off knowledge workers: an AI resume tailor and a 22,000-listing job board scraped from a dozen ATS platforms.' },
  { slug: '/products/doodledapp/',      start: '2024-01', period: '2024 to 2026',        media: 'lg', blurb: 'A no-code studio for building and deploying smart contracts.' },
  { slug: '/products/food-for-future/', start: '2023-01', period: '2023',                media: 'sm', blurb: 'Decentralized data that helps fund the farmers who feed us.' },
  { slug: '/products/telos-obe/',       start: '2022-01', period: '2022 to 2023',        media: 'md', blurb: 'An open-source block explorer for the Telos blockchain.' },
  { slug: '/products/ultra/',           start: '2020-01', period: '2020 to 2023',        media: 'md', blurb: 'A new distribution platform for games, and the developer ecosystem around it.' },
  { slug: '/products/scatter/',         start: '2017-01', period: '2017 to 2021',        media: 'lg', blurb: 'An open-source wallet that became the front door to a whole blockchain.' },
  { slug: '/products/qmarkets/',        start: '2014-01', period: '2014 to 2017',        media: 'sm', blurb: 'Enterprise innovation management, rebuilt around the people who used it.' },
  { slug: '/products/tonara/',          start: '2013-01', period: '2013 to 2015',        media: 'md', blurb: 'Interactive sheet music that follows along as you play.' },
  { slug: '/products/climbingmonster/', start: '2013-01', period: '2013',                media: 'sm', blurb: 'A training companion for rock climbers.' },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function monthYear(d) {
  const [y, m] = d.split('-')
  return `${MONTHS[Number(m) - 1]} ${y}`
}

const items = computed(() => {
  const projectItems = PROJECTS.map((p) => {
    const product = products.find((x) => x.slug === p.slug)
    if (!product) return null
    return {
      type: 'project',
      slug: p.slug,
      title: product.title,
      image: product.images?.default || product.image,
      blurb: p.blurb,
      displayDate: p.period,
      media: p.media,
      sortKey: `${p.start}-01`,
      color: TYPE_COLORS.project,
    }
  }).filter(Boolean)

  const articleItems = articles.map((a) => ({
    type: 'article',
    slug: `/thoughts/${a.slug}`,
    title: a.title,
    image: a.image,
    blurb: a.summary,
    displayDate: monthYear(a.date),
    media: 'sm',
    sortKey: a.date,
    color: TYPE_COLORS.article,
  }))

  const merged = [...projectItems, ...articleItems].sort((a, b) =>
    a.sortKey < b.sortKey ? 1 : a.sortKey > b.sortKey ? -1 : 0
  )

  // Cumulative vertical layout + alternating sides.
  let y = 0
  merged.forEach((it, i) => {
    const h = it.type === 'project' ? PROJECT_ROW : ARTICLE_ROW
    it.y = y + h / 2
    y += h
    it.side = i % 2 === 0 ? 'left' : 'right'
  })

  return merged
})

const totalHeight = computed(() =>
  items.value.reduce((sum, it) => sum + (it.type === 'project' ? PROJECT_ROW : ARTICLE_ROW), 0)
)
const trunkTop = computed(() => (items.value.length ? items.value[0].y : 0))
const trunkHeight = computed(() =>
  items.value.length ? items.value[items.value.length - 1].y - items.value[0].y : 0
)
</script>

<style lang="scss" scoped>
/* Full-bleed wrapper so large images can spill toward the viewport edges;
   overflow-x is clipped here so the bleed never creates a horizontal scrollbar. */
.work-timeline {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  overflow-x: clip;
}

/* ---------- Centered canvas ---------- */

.timeline-inner {
  --gutter: 60px;   // center to label inner edge
  --img-gap: 40px;  // center to image inner edge
  position: relative;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  height: var(--total-h);
}

/* Central trunk, spanning first dot to last dot. */
.timeline-trunk {
  position: absolute;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: rgb(var(--fg-rgb) / 0.18);
}

/* The whole item is one link. display:contents dissolves the anchor box on
   desktop so its children still position absolutely against .timeline-inner;
   it becomes a flex group on mobile. */
.tl-item {
  display: contents;
  color: var(--fg);
  text-decoration: none;
}

/* Node dot on the trunk. */
.tl-node {
  position: absolute;
  left: 50%;
  top: var(--y);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 4px var(--bg);
  z-index: 3;
}

.is-article .tl-node { width: 10px; height: 10px; }

/* Curved branch connector (bezier) from the trunk out to the label. */
.tl-branch {
  position: absolute;
  top: var(--y);
  width: var(--gutter);
  height: 44px;
  overflow: visible;
  transform: translateY(-50%);
  z-index: 2;

  path {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    opacity: 0.85;
    vector-effect: non-scaling-stroke;
  }
}

.label-left .tl-branch  { right: 50%; }
.label-right .tl-branch { left: 50%; }

/* ---------- Label ---------- */

.tl-label {
  position: absolute;
  top: var(--y);
  width: clamp(240px, 26vw, 380px);
  transform: translateY(-50%);
  font-family: $font-family-main, sans-serif;
  z-index: 4;
}

.label-left .tl-label {
  right: 50%;
  margin-right: calc(var(--gutter) + 14px);
  text-align: right;
}

.label-right .tl-label {
  left: 50%;
  margin-left: calc(var(--gutter) + 14px);
  text-align: left;
}

/* ---------- Tags row (pill + date) ---------- */

.tl-tags {
  display: flex;
  align-items: center;
  gap: 0.6em;
  margin-bottom: 0.5em;
}

.label-left .tl-tags { justify-content: flex-end; }

.tl-pill {
  display: inline-block;
  padding: 0.25em 0.7em;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.4;
}

.tl-date {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--fg);
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.tl-title {
  margin: 0 0 0.3em;
  font-family: $font-family-main, sans-serif;
  font-weight: 300;
  font-size: clamp(2rem, 3.2vw, 3.25rem);
  line-height: 1;
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: var(--fg);
  transition: opacity 0.2s ease;
}

.is-article .tl-title { font-size: clamp(1.5rem, 2vw, 2.1rem); }

/* The global h3 rule forces text-align:left, so set it explicitly per side. */
.label-left .tl-title { text-align: right; }
.label-right .tl-title { text-align: left; }

.tl-what {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--fg);
  opacity: 0.7;
  text-wrap: pretty;
}

.is-article .tl-what { font-size: 15px; }

/* ---------- Floating image (always opposite the label) ---------- */

.tl-image {
  position: absolute;
  top: var(--y);
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  overflow: hidden;
  transform: translateY(-50%);
  box-shadow: 0 30px 70px -28px rgb(0 0 0 / 0.5);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  z-index: 1;

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

/* Hovering anywhere on the item (label or image) lifts the image + fades title. */
.tl-item:hover .tl-image {
  transform: translateY(-50%) scale(1.02);
  box-shadow: 0 36px 80px -24px rgb(0 0 0 / 0.6);
}

.tl-item:hover .tl-title { opacity: 0.6; }

/* label-left puts the image on the right (bleeds right); label-right puts it left. */
.label-left .tl-image  { left: 50%; margin-left: var(--img-gap); }
.label-right .tl-image { right: 50%; margin-right: var(--img-gap); }

.tl-image.is-sm { width: clamp(200px, 18vw, 280px); }
.tl-image.is-md { width: clamp(320px, 32vw, 460px); }
.tl-image.is-lg { width: clamp(420px, 52vw, 760px); }

/* ---------- Mobile: linear left-railed list ---------- */

@media screen and (max-width: 900px) {
  .work-timeline { width: 100%; margin-left: 0; }

  .timeline-trunk,
  .tl-branch,
  .tl-node { display: none; }

  .timeline-inner {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: clamp(4.5rem, 11vh, 8rem);
    border-left: 2px solid rgb(var(--fg-rgb) / 0.15);
    padding-left: $spacing-md;
  }

  .tl-item { display: flex; flex-direction: column; }

  .tl-tags,
  .label-left .tl-tags { justify-content: flex-start; }

  .tl-label,
  .label-left .tl-label,
  .label-right .tl-label,
  .tl-image,
  .label-left .tl-image,
  .label-right .tl-image {
    position: static;
    top: auto;
    left: auto;
    right: auto;
    margin: 0;
    transform: none;
    width: 100%;
    text-align: left;
  }

  .tl-image,
  .tl-item:hover .tl-image {
    max-width: 460px;
    margin-top: $spacing-lg;
    transform: none;
    box-shadow: 0 18px 40px -20px rgb(0 0 0 / 0.4);
  }

  /* Give the label's copy room to breathe from the link + image below it. */
  .tl-what { margin-bottom: $spacing-md; }

  .tl-title,
  .label-left .tl-title,
  .label-right .tl-title { font-size: clamp(2rem, 9vw, 3rem); text-align: left; }
  .is-article .tl-title { font-size: clamp(1.6rem, 7vw, 2.2rem); }
}
</style>
