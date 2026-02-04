<template>
  <div class="testimonials-section" ref="sectionRef" @wheel="handleWheel">
    <section id="Clients">
      <div class="clients-container">
        <div class="section-title">I've been so lucky to have such great partners</div>
        <section class="clients">
          <img src="/clients/ibm.png" alt="IBM" />
          <img src="/clients/wpt.png" alt="WPT" />
          <img src="/clients/microsoft.png" alt="Microsoft" />
          <img src="/clients/nvidia.png" alt="NVIDIA" />
          <img src="/clients/wix.png" alt="Wix" />
          <img src="/clients/ultra.png" alt="Ultra" />
          <img src="/clients/equitick.png" alt="Equitick" />
          <img src="/clients/zivav.png" alt="Zivav" />
          <img src="/clients/microgaming.png" alt="Microgaming" />
          <img src="/clients/qmarkets.png" alt="Qmarkets" />
          <img src="/clients/tonara.png" alt="Tonara" />
        </section>
      </div>
    </section>

    <section id="Testimonials" ref="testimonialsRef" :style="{ transform: `translateX(${translateX}px)` }">
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/dani.png" alt="Dani Koesterich">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami is an excellent designer, and a pleasure to work with. His work exceeded my expectations, and his deliverables were always on time or ahead of schedule.</div>
          <div class="user-name">Dani Koesterich</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/michael.png" alt="Michael Birnboim">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami is a very talented designer. He did a few UI projects for my company and we were very pleased. He is very easy to work with and the results were outstanding.</div>
          <div class="user-name">Michael Birnboim</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/tamar.png" alt="Tamar Schoppik">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami is an extraordinary designer with an active imagination that translates directly into a unique and beautiful finished product.</div>
          <div class="user-name">Tamar Schoppik</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/gabe.png" alt="Gabriel Ehrlich">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami's work is beyond reproach. Always on time, extremely gifted and professional, working with Rami is a pleasure.</div>
          <div class="user-name">Gabriel Ehrlich</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/lucas.png" alt="Lucas Haidar">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami is a brilliant mind that truly knows what delivering value means. I can't recommend him enough.</div>
          <div class="user-name">Lucas Haidar</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/nicolas.png" alt="Nicolas Bouillet">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami boasts a diverse skill set that spans technical expertise, acute business acumen, effective communication skills, and even artistic talents.</div>
          <div class="user-name">Nicolas Bouillet</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/anna.png" alt="Anna Török">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Any organization would be fortunate to have someone of Rami's caliber on their team.</div>
          <div class="user-name">Anna Török</div>
        </div>
      </div>
      <div class="single-testimonial">
        <div class="user-image">
          <img src="/homepage/testimonials/gopal.png" alt="Gopal Nair">
        </div>
        <div class="testimonial-card">
          <div class="testimonial">Rami is a Swiss Army Knife in the truest sense. Any organisation would be blessed to have the likes of Rami in their ranks.</div>
          <div class="user-name">Gopal Nair</div>
        </div>
      </div>
      <div class="single-testimonial end-card">
        <div class="end-message">Keep scrolling</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const testimonialsRef = ref<HTMLElement | null>(null)
const translateX = ref(0)
const hasReachedEnd = ref(false)
const hasReachedStart = ref(true)

const maxTranslate = computed(() => {
  if (!testimonialsRef.value) return 0
  const testimonialsWidth = testimonialsRef.value.scrollWidth
  const viewportWidth = window.innerWidth
  return -(testimonialsWidth - viewportWidth + 100)
})

const handleWheel = (e: WheelEvent) => {
  // Only intercept if we're scrolling down and haven't reached end,
  // or scrolling up and haven't reached start
  const scrollingDown = e.deltaY > 0
  const scrollingUp = e.deltaY < 0

  if (scrollingDown && hasReachedEnd.value) {
    // Allow normal scroll to next section
    return
  }

  if (scrollingUp && hasReachedStart.value) {
    // Allow normal scroll to previous section
    return
  }

  // Prevent vertical scroll, do horizontal instead
  e.preventDefault()

  const delta = e.deltaY * 2 // Amplify for faster horizontal scroll
  const newTranslate = translateX.value - delta

  // Clamp the value
  if (newTranslate > 0) {
    translateX.value = 0
    hasReachedStart.value = true
    hasReachedEnd.value = false
  } else if (newTranslate < maxTranslate.value) {
    translateX.value = maxTranslate.value
    hasReachedEnd.value = true
    hasReachedStart.value = false
  } else {
    translateX.value = newTranslate
    hasReachedStart.value = false
    hasReachedEnd.value = false
  }
}

onMounted(() => {
  // Reset state when component mounts
  translateX.value = 0
  hasReachedStart.value = true
  hasReachedEnd.value = false
})
</script>

<style lang="scss" scoped>
.testimonials-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: $black;
  margin: $spacing-xl;
  border-radius: $br-sm;
}

#Clients {
  padding: 0;
}

.clients {
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  background: $black;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
  }

  img {
    height: 32px;
    mix-blend-mode: luminosity;

    @media screen and (max-height: 1000px) {
      height: 20px;
    }
  }
}

.clients-container {
  display: grid;
  grid-template-columns: 1fr;
  padding: $spacing-lg 0;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: $spacing-sm;
  }

  .section-title {
    font-size: 3dvw;
    font-weight: 400;
    line-height: 100%;
    text-wrap: balance;
    text-align: center;
    padding: 0 0 $spacing-lg;
    opacity: 0.4;
    color: $white;

    @media screen and (max-width: 1000px) {
      font-size: 6dvw;
      padding: $spacing-md;
    }
  }
}

#Testimonials {
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  font-family: $font-family-secondary;
  will-change: transform;
  padding: $spacing-md $spacing-xl;
  transition: transform 0.1s ease-out;

  @media screen and (max-width: 1000px) {
    gap: $spacing-sm;
  }

  .single-testimonial {
    flex-shrink: 0;
    width: 20vw;
    padding: $spacing-sm;
    display: flex;
    flex-direction: row;
    gap: $spacing-sm;
    color: $white;
    max-width: 500px;

    @media screen and (max-width: 1600px) {
      width: 30vw;
    }

    @media screen and (max-width: 1200px) {
      width: 40vw;
    }

    @media screen and (max-width: 1000px) {
      width: 60vw;
    }

    @media screen and (max-width: 768px) {
      width: 85vw;
    }

    &.end-card {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;

      .end-message {
        font-size: $font-size-md;
        color: rgba($white, 0.3);
        text-align: center;
      }
    }

    .user-image img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: $border;
      flex-shrink: 0;
    }

    .testimonial-card {
      border-radius: $br-sm;
      text-decoration: none;
      display: flex;
      gap: $spacing-xs;
      flex-direction: column;
      align-items: flex-start;
      font-size: $font-size-md;
      font-family: $font-family-main;
      line-height: 140%;
      opacity: 0.7;

      .user-name {
        line-height: 100%;
        font-size: $font-size-sm;
        opacity: 0.6;
        font-family: $font-family-main;
      }
    }
  }
}
</style>
