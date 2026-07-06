# Homepage rework: story-driven hero + timeline portfolio preview

> 2026-07-01

## Context

The homepage (`components/SimpleHomepage.vue`) currently opens with a single one-line
headline and jumps straight into a portfolio grid. Rami wants the **first scroll** to
carry more of who he is — a **designer with a developer's background who builds developer
tools to make work more efficient** — and wants the portfolio preview to read as a
**story of his work over time**, newest → oldest, each item linking to an extended case
study.

Featured projects, in order (newest → oldest):
**Sprawl · SessionSight · Miserably Unemployed · Doodledapp · Ultra · Scatter · Qmarkets**

Of these, **Doodledapp, Ultra, Scatter, Qmarkets** already exist (product entries +
`pages/products/*.vue` + assets). **Sprawl, SessionSight, Miserably Unemployed** are new —
nothing exists yet. Decisions from the user: scaffold **full** case-study pages for the new
ones (with placeholder copy/images to be replaced), add **era/year framing** to the
portfolio preview, and **use the drafted hero copy direction**. No images exist for the new
projects yet, so placeholders are used.

## Note: work already partially on disk

One edit was applied to `SimpleHomepage.vue` before plan mode: the intro `<section>` now
has `ref="introEl"`, an `.intro-inner` wrapper, an updated headline
("I'm a `designer` with a `developer's` background."), and `.intro-subhead` / `.intro-lede`
paragraphs. The matching `popoverWords` rename (strategic/technical → designer/developer),
the new styles, and the scroll-fade wiring were **not** applied — so hover popovers and
styling are currently broken and must be completed as part of this plan.

## Changes

### 1. Hero section — `components/SimpleHomepage.vue`

- **Reconcile the popover map**: rename `popoverWords.strategic` → `designer` and
  `.technical` → `developer` (keys must match the `showPopover('designer'|'developer')`
  calls already in the template). Draft phrasings:
  - `designer`: "Start with the human." / "Cut what doesn't help." / "Make the complex feel simple."
  - `developer`: "Read the codebase." / "Ship the prototype." / "Trust what actually runs."
- **Hero copy** (already in template, keep): headline + `.intro-subhead`
  ("I build developer tools that make work more efficient.") + `.intro-lede` narrative
  citing Qmarkets / Scatter (250K daily users) / Ultra and the through-line
  "find where the work is slow or painful, and design the tool that fixes it."
- **Styles**: add `.intro-inner`, `.intro-subhead`, `.intro-lede` rules using the existing
  type scale — headline stays `$font-family-main`; supporting copy uses
  `$font-family-secondary`/Roboto at ~17–20px, `max-width` for readable measure, centered
  to match `.intro`. Keep everything inside the first viewport where possible (may reduce
  `.intro` `padding-top: 180px`).
- **Scroll-fade**: extend `updateHero()` to fade the whole intro. Apply `opacity` to
  `introEl` (covers headline + paragraphs) and keep the `line-height` tightening on
  `heroEl` (the h1). Add `introEl` ref to the script refs.

### 2. Portfolio preview as a timeline — `components/SimpleHomepage.vue` + `components/Portfolio.vue`

- In `SimpleHomepage.vue`, wrap the work section as a `section-railed` (matching the
  Thoughts/Companies/Learn pattern) with rail title + explainer that states the
  through-line, e.g. *"A decade of building tools"* / *"Enterprise software to crypto
  wallets to developer platforms — the same instinct, newest first."*
- In `Portfolio.vue`:
  - Update `homepageSlugs` to the 7 featured slugs in the specified order:
    `/products/sprawl/`, `/products/sessionsight/`, `/products/miserably-unemployed/`,
    `/products/doodledapp/`, `/products/ultra/`, `/products/scatter/`, `/products/qmarkets/`.
  - Re-balance the `size` values so the grid rows still look good with this set
    (the CSS row pattern is driven by per-item `is-small`/`is-large`).
  - **Year framing**: render `p.year` in `.portfolio-meta` (small, dimmed, before the
    title) when present. Gate with a `showYear` prop (default false) so the homepage passes
    `show-year` and other usages (random "More products") are unaffected. Add a
    `.portfolio-year` style.

### 3. Product data — `utils/products.js`

- Add a `year` field to at least the 7 featured entries so the timeline reads
  chronologically (e.g. Qmarkets 2015, Scatter 2018, Ultra 2020, Doodledapp 2021, and
  best-guess/placeholder years for the 3 new ones — flagged for the user to confirm).
- Add 3 new product objects (Sprawl, SessionSight, Miserably Unemployed) following the
  existing shape: `title, description, image, images.default/hover, logo?, bg?, status,
  slug, color, class, type: 'Product Case Study', size, year`. Use the shared placeholder
  image (below) until real assets exist. Descriptions are placeholders to be confirmed.

### 4. New case-study pages — `pages/products/{sprawl,sessionsight,miserably-unemployed}.vue`

- Scaffold each using the existing pattern from `pages/products/doodledapp.vue`:
  `<ProjectsOverview title tagline overview :services />` header, then 2–3 `.discuss`
  sections (heading + paragraph + `.discuss-images`), a `More products`
  `<Portfolio random="3" />` block, `<Footer />`, and `useHead`/`useSeoMeta`.
- Copy is **placeholder** (clearly marked `TODO`), images point at the shared placeholder.
  Reuses existing components `ProjectsOverview`, `Portfolio`, `Footer` — no new components.

### 5. Placeholder asset

- Add `public/products/placeholder.svg` (a neutral labeled placeholder) and reference it
  from the 3 new product entries and their case-study `.discuss` images so nothing 404s.
  (If NuxtImg's `format="webp"` transform rejects SVG, fall back to reusing an existing
  raster image as the temporary placeholder.)

## Inputs still needed from the user (to replace placeholders)

- One-line description + real year for **Sprawl, SessionSight, Miserably Unemployed**.
- Case-study copy (tagline, overview, section text) for the 3 new pages.
- Screenshots/images for the 3 new projects (drop into `public/products/<slug>/`).

## Verification

- `npm run dev`, load `/`:
  - First scroll shows headline + subhead + narrative; hovering `designer` / `developer`
    shows the correct popover words; scrolling fades the whole intro.
  - Work section shows the 7 featured projects in order with year labels and a rail
    through-line; grid layout still looks balanced at desktop / tablet / mobile widths.
  - Cards link to the right case studies; the 3 new pages render (placeholder content, no
    console/404 errors on the placeholder image).
- Check `/products` (uses `<Portfolio />` with no `show-year`) is unaffected, and that
  "More products" random blocks still render.
