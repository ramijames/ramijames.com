<template>
  <div ref="containerRef" class="testimonials-container">
    <section id="Clients">
      <div :class="['clients', { visible: isVisible }]">
        <div><img src="/clients/ibm.png" alt="IBM" /></div>
        <div><img src="/clients/wpt.png" alt="WPT" /></div>
        <div><img src="/clients/microsoft.png" alt="Microsoft" /></div>
        <div><img src="/clients/nvidia.png" alt="NVIDIA" /></div>
        <div><img src="/clients/wix.png" alt="Wix" /></div>
        <div><img src="/clients/ultra.png" alt="Ultra" /></div>
        <div><img src="/clients/zivav.png" alt="Zivav" /></div>
        <div><img src="/clients/microgaming.png" alt="Microgaming" /></div>
        <div><img src="/clients/qmarkets.png" alt="Qmarkets" /></div>
        <div><img src="/clients/tonara.png" alt="Tonara" /></div>
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
  filter: invert(1);

  @media screen and (max-width: 1600px) {
    padding: $spacing-md;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: $spacing-xs;
  }
  
  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
    grid-template-columns: 1fr 1fr;
  }

  div {
    background: $black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: $br-sm;

    img {
      height: 44px;
      padding: $spacing-xs;
      align-self: center;
      justify-self: center;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      mix-blend-mode: luminosity;
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
    div {
      background: $white;

      img {
        filter: invert(1);
      }
    }

    
  }
}
</style>
