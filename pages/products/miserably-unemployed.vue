<template>

  <ProjectsOverview
    title="Miserably Unemployed"
    tagline="Make the job hunt a little less miserable."
    overview="Miserably Unemployed is a SaaS for laid-off knowledge workers. It pairs an AI-powered resume tailor, paste a job URL and get a matched resume and cover letter back, with a job board of around 22,000 live postings scraped every few hours from more than a dozen ATS platforms and remote-job aggregators. It's built as a set of independent Bun services behind a thin SvelteKit shell, so the board stays fast even at that scale."
    :services="['Product', 'Design', 'Development']"
  />

  <main class="w-consistent">

    <div>

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>For people who just got laid off</h3>
              <p>Losing a job drops you into two tedious grinds at once: finding roles worth applying to, and rewriting your resume for every one of them. Miserably Unemployed puts both in a single place, a searchable board of real, current openings and a tool that does the tailoring for you, so the hunt feels less like a second unpaid job.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="Miserably Unemployed" class="single-product-image" />
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Resume Tailor</h3>
              <p>Paste a job posting's URL and get back a tailored resume and cover letter as a polished PDF. It's persona-driven and AI-generated, matched against the keywords an applicant-tracking system will actually screen for, so what you send has a real chance of making it past the first automated filter.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="Resume Tailor" class="single-product-image" />
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>A job board that feels instant</h3>
              <p>Around 22,000 postings are scraped every few hours from thirteen ATS platforms and three remote-job aggregators, then presented as a Mac-Mail-style inbox with drill-down location filters and instant client-side selection. Find something promising and hand it straight to the Tailor in one click. Keeping that snappy at 22,000 rows was its own performance-engineering exercise, from the API split down to how the list renders.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/placeholder.svg" alt="Job board" class="single-product-image" />
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
  title: () => `Miserably Unemployed`
})

useSeoMeta({
  title: 'Miserably Unemployed',
  ogTitle: 'Miserably Unemployed',
  description: 'Miserably Unemployed is a SaaS for laid-off knowledge workers: an AI resume tailor plus a job board of around 22,000 live postings scraped from a dozen ATS platforms.',
  ogDescription: 'A SaaS for laid-off knowledge workers: an AI resume tailor and a 22,000-listing job board scraped from a dozen ATS platforms.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/miserably-unemployed',
  twitterTitle: 'Miserably Unemployed',
  twitterDescription: 'A SaaS for laid-off knowledge workers: an AI resume tailor and a 22,000-listing job board scraped from a dozen ATS platforms.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>
