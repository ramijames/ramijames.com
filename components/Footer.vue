<template>
  <footer>
    <section ref="ctaSection" class="footer-cta">
      <div class="cta-content">

        <h2>Let's work together</h2>
        <p>I'm always keen to connect with like-minded builders who are interested in pushing the envelope of what is possible in the product design space.</p>
        <button class="start-project-btn large" @click="openContactModal">Create Product</button>
      </div>
    </section>
    <ContactModal :isOpen="isContactModalOpen" @close="closeContactModal" />
    <div class="footer-content w-full">
      <div class="footer-links">
        <section class="footer-social">
          <a href="https://github.com/ramijames">
            <img class="icon" src="/github-dark.svg" alt="Github" />
          </a>
          <a href="https://www.linkedin.com/in/rami-james/">
            <img class="icon" src="/linkedin-dark.svg" alt="LinkedIn" />
          </a>
          <a href="mailto:ramijames@gmail.com">
            <img class="icon" src="/mail-dark.svg" alt="Send Rami an email" />
          </a>
        </section>
        <nuxt-link class="link" href="/learn-threejs">Learn Three.js</nuxt-link>
        <nuxt-link class="link" href="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link class="link" href="/terms-and-conditions">Terms</nuxt-link>
      </div>
      <section class="copyright">
        <span>&copy; Rami James 2003-2025</span>
      </section>
    </div>
  </footer>
</template>

<script setup>
import { useUIStore } from '~/store/ui'
import { onMounted, onUnmounted, ref } from 'vue'
import ContactModal from '~/components/ContactModal.vue'

const uiStore = useUIStore()

const ctaSection = ref(null)
const isContactModalOpen = ref(false)
let observer = null

const openContactModal = () => {
  isContactModalOpen.value = true
}

const closeContactModal = () => {
  isContactModalOpen.value = false
}

onMounted(() => {
  // Set up intersection observer for CTA section
  if (ctaSection.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          uiStore.setFooterCtaVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(ctaSection.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped lang="scss">
.footer-cta {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: $spacing-xl 0;

  .cta-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100vh;
    z-index: 0;
    opacity: 0.5;

    :deep(.threejs-container) {
      height: 100%;
    }
  }

  .cta-content {
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md;

    h2 {
      font-family: $font-family-main;
      line-height: 100%;
      margin: 0;
    }

    p {
      font-family: $font-family-main;
      font-size: $font-size-lg;
      margin: 0;
      opacity: .9;
      line-height: 1.2;
      max-width: 540px;
      text-wrap: balance;

      @media screen and (max-width: 768px){
        font-size: $font-size-md;
      }
    
    }
  }
}

.dark {
  footer {
    background: rgba($black, 0.5);
  }
}

footer {
  width: 100%;
  font-family: $font-family-secondary;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  background: rgba($white, 0.5);
  backdrop-filter: blur(128px);

  @media screen and (max-width: 1000px){
    align-items: center;
    flex-direction: column;
    border-bottom: none;
  }

  .footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    background: $black;
    border-top: 1px solid rgba($white, 0.2);

    @media screen and (max-width: 1000px){
      align-items: center;
      flex-direction: column;
    }
  }

  .copyright {
    font-size: 11px;
    opacity: 0.3;
    padding: $spacing-sm;
    color: $white;
  }

  .footer-links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-md;
    color: $white !important;
    
    
    @media screen and (max-width: 1000px){
      .link {
        display: none;
      }
    }
    
    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 1000px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-sm;
      opacity: 1;
      width: 100%;
    }

    a {
      text-decoration: none;
      font-size: $font-size-sm;
      transition: all 0.5s ease-in-out;
      font-size: 9px;
      font-weight: 500;
      color: rgba($white, 1);
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: $spacing-sm 0;

      &:hover {
        color: rgba($black, 1);
      }

    }
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-md;
    transition: opacity 0.5s ease-in-out;
    border-right: 1px solid rgba($white, 0.2);
    padding-right: $spacing-md;

    @media screen and (max-width: 1000px){
      border-right: none;
      padding: 0 $spacing-md;
      border-bottom: 1px solid rgba($black, 0.2);
      width: 100%;
    }

    &:hover {
      opacity: 1;
    }

    a {
      img {
        width: 30px;
      }
    }
  }
}

</style>
