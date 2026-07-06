<template>

  <ProjectsOverview
    title="SessionSight"
    tagline="Close the loop between marketing and product insight."
    overview="SessionSight is an all-in-one growth platform. Distribute content through campaigns and automated workflows, then see exactly what happens when that traffic arrives: session replays, heatmaps, funnels, form analytics, and user feedback. Run split tests, manage feature flags, and track goals, then feed those learnings straight back into the next round of positioning, messaging, and outreach."
    :services="['Product', 'Design', 'Development']"
  />

  <main class="w-consistent">

    <div>

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Marketing and analytics, in one place</h3>
              <p>Most teams stitch together a marketing tool for outbound and a separate product-analytics tool for what happens after, and the two never really talk to each other. SessionSight distributes content through campaigns and automated workflows, then captures what that content actually does once people land, closing the loop between the message you sent and the behaviour it produced.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="SessionSight dashboard" class="single-product-image" />
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>See what users actually do</h3>
              <p>Session replays, heatmaps, funnels, and form analytics show where people succeed and where they quietly give up. An embeddable SDK drops into a product in minutes, so the picture of real behaviour is built from the same source of truth the marketing side is working against.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="SessionSight replays and heatmaps" class="single-product-image" />
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Test, flag, and iterate</h3>
              <p>Split testing, feature flags, and goal tracking turn those observations into experiments. Ship a change behind a flag, measure it against a goal, and let the result inform the next round of messaging, so growth and product improve together instead of in separate silos.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="SessionSight experiments" class="single-product-image" />
            </div>
          </section>

        </section>
      </section>
    </div>

  </main>
  <section class="more-products w-consistent">
    <h3>More products</h3>
    <Portfolio random="3" />
  </section>
  <Footer />

</template>

<script setup>
useHead({
  title: () => `SessionSight`
})

useSeoMeta({
  title: 'SessionSight',
  ogTitle: 'SessionSight',
  description: 'SessionSight is an all-in-one growth platform that closes the loop between marketing and product insight, with session replays, heatmaps, funnels, split testing, and feature flags.',
  ogDescription: 'An all-in-one growth platform connecting marketing to product insight: replays, heatmaps, funnels, split testing, and feature flags.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/sessionsight',
  twitterTitle: 'SessionSight',
  twitterDescription: 'An all-in-one growth platform connecting marketing to product insight: replays, heatmaps, funnels, split testing, and feature flags.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>
