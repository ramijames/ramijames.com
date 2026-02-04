<template>
  <div ref="containerRef" class="testimonials-container">
    <section id="Clients">
      <div :class="['clients', { visible: isVisible }]">
        <img src="/clients/ibm.png" alt="IBM" />
        <img src="/clients/wpt.png" alt="WPT" />
        <img src="/clients/microsoft.png" alt="Microsoft" />
        <img src="/clients/nvidia.png" alt="NVIDIA" />
        <img src="/clients/wix.png" alt="Wix" />
        <img src="/clients/ultra.png" alt="Ultra" />
        <img src="/clients/zivav.png" alt="Zivav" />
        <img src="/clients/microgaming.png" alt="Microgaming" />
        <img src="/clients/qmarkets.png" alt="Qmarkets" />
        <img src="/clients/tonara.png" alt="Tonara" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.3 }
  )

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>

.testimonials-container {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  position: relative;
  z-index: 1;
  background: rgba($white, .5);
  -webkit-backdrop-filter: blur(128px);
  backdrop-filter: blur(128px);
}

#Clients {
  padding: $spacing-md 0 0;
}

.clients {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: $spacing-md;
  opacity: 1;
  padding: $spacing-lg;
  border-radius: $br-sm;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
    grid-template-columns: 1fr 1fr;
  }

  img {
    min-height: 34px;
    background: $black;
    padding: $spacing-xs;
    border-radius: $br-sm;
    align-self: center;
    justify-self: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;

    @media screen and (max-height: 1000px) {
      height: 18px;
    }
  }

  &.visible img {
    opacity: 1;
    transform: translateY(0);

    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        transition-delay: #{($i - 1) * 0.1}s;
      }
    }
  }
}

.dark {
  .testimonials-container {
    background: $black;
  }

  .testimonials-header {
    .testimonials-header-text {
      h2, p {
        color: $white;
      }
    }
  }

  #Testimonials {
    .single-testimonial {
      background: rgba($white, 0.1);
    }
  }

  .clients {
    opacity: 0.5;

    img {
      filter: invert(1);
    }
  }
}
</style>
