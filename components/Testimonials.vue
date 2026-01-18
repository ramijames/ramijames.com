<template>
  <div class="testimonials-wrapper" ref="wrapperRef">
    <div class="testimonials-container">
      <div class="sticky-container">
        <section id="Clients">
          <div class="clients-container w-consistent">
            <div class="section-title">I've been so lucky to have such great partners</div>
            <section class="clients">
              <img src="/clients/ibm.png" />
              <img src="/clients/wpt.png" />
              <img src="/clients/microsoft.png" />
              <img src="/clients/nvidia.png" />
              <img src="/clients/wix.png" />
              <img src="/clients/ultra.png" />
              <img src="/clients/equitick.png" />
              <img src="/clients/zivav.png" />
              <img src="/clients/microgaming.png" />
              <img src="/clients/qmarkets.png" />
              <img src="/clients/tonara.png" />
            </section>
          </div>
        </section>
        <section id="Testimonials" ref="testimonialsRef" :style="{ transform: `translateX(${translateX}px)` }">
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/dani.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami is an excellent designer, and a pleasure to work with. His work exceeded my expectations, and his deliverables were always on time or ahead of schedule. I would recommend him to anyone seeking high quality web design from a professional, and look forward to working with Rami in the future.</div>
              <div class="user-name">Dani Koesterich</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/michael.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami is a very talented designer. He did a few UI projects for my company and we were very pleased. He is very easy to work with and the results were outstanding.</div>
              <div class="user-name">Michael Birnboim</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/tamar.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami is an extraordinary designer with an active imagination that translates directly into a unique and beautiful finished product. Alongside his attention to detail and keen understanding of designing for SEO and engagement, Rami is flexible and personable (two characteristics not often easy to find among talented designers).</div>
              <div class="user-name">Tamar Schoppik</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/gabe.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami's work is beyond reproach. Always on time, extremely gifted and professional, working with Rami is a pleasure.</div>
              <div class="user-name">Gabriel Ehrlich</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/lucas.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami is a briliant mind that truly knows what delivering value means. I can't recommend him enough and I really hope to get to work with him again in the future.</div>
              <div class="user-name">Lucas Haidar</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/nicolas.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami boasts a diverse skill set that spans technical expertise, acute business acumen, effective communication skills, and even artistic talents. His versatility is incredibly useful, especially in product-driven companies.</div>
              <div class="user-name">Nicolas Bouillet</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/anna.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Any organization would be fortunate to have someone of Rami's caliber on their team, as he seamlessly blends technical prowess, strategic insight, and a true team player ethos.</div>
              <div class="user-name">Anna Török</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/gopal.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami is a Swiss Army Knife in the truest sense. Any organisation would be blessed to have the likes of Rami in their ranks.</div>
              <div class="user-name">Gopal Nair</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/jodi.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Rami is a very professional, talented, serious and intricate designer. His attention to details is astounding and his design work is creative and concise.</div>
              <div class="user-name">Jodi Benjamin</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/francine.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">You won't find many designers that come close to Rami in terms of talent, innovation, originality and implementation. Rami will take a concept and turn it into a full blown brand across all medium but his talent really shines on the web.</div>
              <div class="user-name">Francine Haliva</div>
            </div>
          </div>
          <div class="single-testimonial">
            <div class="user-image">
              <img src="/homepage/testimonials/julian.png">
            </div>
            <div class="testimonial-card">
              <div class="testimonial">Working with Rami is fun, interesting and exciting – exactly the way creative design should be. Plus he's always reliable, always 100% honest and always on time. Work with Rami and add some panache to your creative!</div>
              <div class="user-name">Julian Bewley</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getLenis } = useLenis()

const wrapperRef = ref<HTMLElement | null>(null)
const testimonialsRef = ref<HTMLElement | null>(null)
const translateX = ref(0)

onMounted(() => {
  const lenis = getLenis()

  if (lenis) {
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      if (!wrapperRef.value || !testimonialsRef.value) return

      const wrapper = wrapperRef.value
      const testimonials = testimonialsRef.value
      const wrapperTop = wrapper.offsetTop
      const wrapperHeight = wrapper.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate scroll progress within the wrapper section
      const scrollStart = wrapperTop - viewportHeight
      const scrollEnd = wrapperTop + wrapperHeight - viewportHeight
      const scrollRange = scrollEnd - scrollStart

      // Calculate progress (0 to 1)
      let progress = (scroll - scrollStart) / scrollRange
      progress = Math.max(0, Math.min(1, progress))

      // Calculate how much to translate (testimonials width minus viewport)
      const testimonialsWidth = testimonials.scrollWidth
      const viewportWidth = window.innerWidth
      const maxTranslate = testimonialsWidth - viewportWidth + 100 // extra padding

      // Start from left (positive offset) and move to right (showing content from left to right)
      translateX.value = -progress * maxTranslate
    })
  }
})
</script>

<style lang="scss" scoped>
.testimonials-wrapper {
  height: 300vh;
  position: relative;
}

.testimonials-container {
  position: sticky;
  top: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: $black;

  .section-title {
    font-size: 3dvw;
    font-weight: 400;
    line-height: 100%;
    text-wrap: balance;
    text-align: center;
    padding: $spacing-lg 0;
    opacity: 0.4;
    position: relative;

    @media screen and (max-width: 1000px) {
      font-size: 6dvw;
      padding: $spacing-md;
    }
  }
}

.sticky-container {
  width: 100%;
  overflow: visible;

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
      mix-blend-mode:luminosity;

      @media screen and (max-height: 1000px) {
        height: 20px;
      }
    }
  }

  .clients-container {
    display: grid;
    grid-template-columns: 1fr;
    padding: $spacing-xl 0;
    align-items: center;

    @media screen and (max-width: 1200px) {
      padding: $spacing-md;
    }

    @media screen and (max-height: 1000px) {
      padding: $spacing-md;
    }

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
      position: relative;
      color: $white;

      @media screen and (max-width: 1000px) {
        font-size: 6dvw;
        padding: $spacing-md;
      }
    }
  }
}

#Testimonials {
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  font-family: $font-family-secondary;
  padding-left: 100vw;
  will-change: transform;
  container-type: inline-size;
  padding: $spacing-md $spacing-xl;

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
    max-width: 600px;

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
      width: 90vw;
    }

    .user-image img {
      width: 60px;
      height: 60px;
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
      font-size: $font-size-lg;
      font-family: $font-family-main;
      line-height: 140%;
      opacity: 0.7;

      @media screen and (max-height: 1000px) {
        font-size: $font-size-md;
      }

      .user-name {
        line-height: 100%;
        font-size: $font-size-md;
        opacity: .6;
        font-family: $font-family-main;
      }
    }
  }
}

</style>