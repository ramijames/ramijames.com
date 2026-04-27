<template>

  <ProjectsOverview
    title="Food For Future"
    tagline="Decentralized data for funding farmers"
    overview="I designed the POC which was presented to the UN."
    :services="['Design', 'UX', 'Branding']"
  />

  <main class="w-consistent">

    <div>

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Mobile access to critical data</h3>
              <p>I created the initial designs for the Food for Future mobile application which allowed potential funders to access critical data on the state of farms in deep rural areas.</p>
            </div>
            <div class="discuss-images">
              <section class="product-images three-across">
                <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-global-short.png" alt="Food for Future global view" class="single-product-image" />
                <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-farms-explore.png" alt="Food for Future farms explorer" class="single-product-image" />
                <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-farms-single.png" alt="Food for Future single farm" class="single-product-image" />
              </section>
              <section class="product-images two-across">
                <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-field-single.png" alt="Food for Future field details" class="single-product-image" />
                <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-menu-open.png" alt="Food for Future navigation menu" class="single-product-image" />
              </section>
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Branding</h3>
              <p>As part of the pitch process, I designed a concept brand, palette, and icon set. These were intended to present a fresh, modern take on dry data.</p>
            </div>
            <div class="discuss-images">
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-brand.png" alt="Food for Future brand" class="single-product-image" />
              <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/food-for-future/fff-icons.png" alt="Food for Future icons" class="single-product-image" />
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
</script>