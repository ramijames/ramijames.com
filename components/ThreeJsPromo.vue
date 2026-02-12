<template>
  <div class="promo-container">
    <div class="promo-bg">
      <ThreejsPlasmaTrails />
    </div>
    <section id="PromoCards">
      <div>
        <h2>Three.js Playground</h2>
        <p>As the modern web moves more into the 3d realm, it's been my pleasure to explore it in-depth. Hopefully, some of what I've learned can be helpful for you, too.</p>
      </div>
      <section class="links">
        <nuxt-link class="promo-card" to="/learn-threejs">
          <div>
            <div class="card-title">Learn Three.js</div>
            <div class="card-description">Step-by-step tutorials to master 3D on the web</div>
          </div>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5294 1.00001L18 8.47067L10 16.4706" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M17 8.47064H1" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>

        </nuxt-link>
        <nuxt-link class="promo-card" to="/three-js-experiments">
          <div>
            <div class="card-title">Three.js Experiments</div>
            <div class="card-description">Interactive demos exploring particles, fractals, and more</div>
          </div>
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5294 1.00001L18 8.47067L10 16.4706" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M17 8.47064H1" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>

        </nuxt-link>
      </section>
    </section>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.promo-container {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
  padding: $spacing-xl;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(-20deg, $gray-dark 15% , $black 100%);

  @media screen and (max-width: 1000px) {
    padding: calc($spacing-md + 58px) $spacing-md $spacing-md $spacing-md;
    padding-bottom: calc($spacing-md + env(safe-area-inset-bottom));
    gap: $spacing-xs;
  }
}

.promo-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  -webkit-mask-image: linear-gradient(-20deg, black 45% , transparent 80%);
  mask-image: linear-gradient(-20deg, black 45% , transparent 80%);
  pointer-events: all;

  :deep(.threejs-container) {
    height: 100% !important;
    width: 100%;
  }
}

#PromoCards {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: space-between;
  min-height: 0;
  position: relative;
  z-index: 1;
  
  .links {
    display: flex;
    gap: $spacing-xs;
    flex-direction: column;
  }

  h2, p {
    color: $white;
    text-shadow: 0 10px 10px black;
    margin:0;
  }

  p {
    opacity: 0.65;
    margin-top: $spacing-xs;
    max-width: 600px;
    text-wrap: balance;
  }

  .promo-card {
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    display: flex;
    gap: $spacing-xs;
    flex-direction: row;
    border: 1px solid rgba($white, 0.15);
    background: rgba($black, 0.2);
    backdrop-filter: blur(40px);
    align-self: flex-start;
    align-items: center;
    justify-content: space-between;
    width: 480px;
    padding: $spacing-md;
    border-radius: $br-sm;
    transition: all 0.24s ease-in-out;

    @media screen and (max-width: 1000px) {
      width: 100%;
      min-width: initial;
      padding: $spacing-sm;
    }

    &:hover {
      border: 1px solid rgba($white, 1);
    }


    .card-title {
      color: $white;
      font-size: $font-size-md;
    }

    .card-description {
      color: rgba(255, 255, 255, 0.65);
      font-size: $font-size-xs;
    }
  }
}
</style>
