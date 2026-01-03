<template>
  <section id="Testimonials">
    <div class="single-testimonial hide">
      <div class="user-image">
        <img src="/homepage/testimonials/jodi.png">
      </div>
      <div class="testimonial-card">
        <div class="testimonial">Rami is a very professional, talented, serious and intricate designer. His attention to details is astounding and his design work is creative and concise.</div>
        <div class="user-name">Jodi Benjamin</div>
      </div>
    </div>
    <div class="single-testimonial hide">
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
        <img src="/homepage/testimonials/dani.png">
      </div>
      <div class="testimonial-card">
        <div class="testimonial">Rami is an excellent designer, and a pleasure to work with. His work exceeded my expectations, and his deliverables were always on time or ahead of schedule. I would recommend him to anyone seeking high quality web design from a professional, and look forward to working with Rami in the future.</div>
        <div class="user-name">Dani Koesterich</div>
      </div>
    </div>
    <div class="single-testimonial hide">
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
    <div class="single-testimonial hide">
      <div class="user-image">
        <img src="/homepage/testimonials/gabe.png">
      </div>
      <div class="testimonial-card">
        <div class="testimonial">Rami's work is beyond reproach. Always on time, extremely gifted and professional, working with Rami is a pleasure.</div>
        <div class="user-name">Gabriel Ehrlich</div>
      </div>
    </div>
    <div class="single-testimonial hide">
      <div class="user-image">
        <img src="/homepage/testimonials/julian.png">
      </div>
      <div class="testimonial-card">
        <div class="testimonial">Working with Rami is fun, interesting and exciting – exactly the way creative design should be. Plus he’s always reliable, always 100% honest and always on time. Work with Rami and add some panache to your creative!</div>
        <div class="user-name">Julian Bewley</div>
      </div>
    </div>
    <div class="single-testimonial hide">
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
    <div class="single-testimonial hide">
      <div class="user-image">
        <img src="/homepage/testimonials/anna.png">
      </div>
      <div class="testimonial-card">
        <div class="testimonial">Any organization would be fortunate to have someone of Rami's caliber on their team, as he seamlessly blends technical prowess, strategic insight, and a true team player ethos.</div>
        <div class="user-name">Anna Török</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

@import './assets/variables';

.dark {
  #Testimonials {
    color: $white;
    background: rgba($blue, 0.05);

    .single-testimonial {

      .user-image img {
        border: $border;
        box-shadow: 0 10px 20px rgba($black, .8);
      }

      .testimonial-card {
        .user-name {
          color: $blue;
          border-top: $border;
        }
      }
    }
  }
}

#Testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-sm;
  border-top: $border;
  font-family: $font-family-secondary;
  padding: $spacing-xl;

  @media screen and (max-width: 1200px) {
    padding: $spacing-md;
    gap: 0;
  }

  @media screen and (max-width: 768px) {
    padding: $spacing-sm;
    gap: 0;
  }

  .single-testimonial {
    min-height: 200px;
    padding: $spacing-sm;
    display: flex;
    flex-direction: row;
    gap: $spacing-sm;

    @media screen and (max-width: 1000px) {
      min-height: auto;

      &.hide {
        display: none;
      }
    }

    .user-image img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: $border;
    }

    .testimonial-card {
      border-radius: $br-sm;
      transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
      display: flex;
      gap: $spacing-xs;
      flex-direction: column;
      font-size: $font-size-sm;
      line-height: 140%;
      max-width: 300px;

      @media screen and (max-width: 1000px) {
        max-width: 100%;
      }
      
      .testimonial {
        opacity: 0.4;
      }

      .user-name {
        color: $blue;
        border-top: $border;
        padding-top: $spacing-xs;
      }
    }
  }
}

</style>