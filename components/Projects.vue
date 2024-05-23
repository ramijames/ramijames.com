<template>
  <section id="projects" class="general-main" ref="projects">
    <section class="talk-to-me" ref="talkToMe">
      <SectionTitle title="A better way to get your product to market" subtitle="Product development as you knew it has evolved to fit your needs." />
      <section class="project-steps">
        <div class="step">
          <img src="/project-step-1.png">
          <p>Subscribe and request as many designs as you need.</p>
        </div>
        <div class="step">
          <img src="/project-step-1.png">
          <p>The average turnaround for a design is two days.</p>
        </div>
        <div class="step">
          <img src="/project-step-1.png">
          <p>We keep iterating until you are satisfied with the result.</p>
        </div>
      </section>
    </section>
    
    <section class="portfolio" ref="portfolio">
      <section class="works">
        <nuxt-link 
          class="single-work" 
          v-for="(product, index) in products" 
          :key="product.title" 
          :to="product.slug" 
          :style="{ 
            animationDelay: index * 0.2 + 's', 
            backgroundColor: product.color, 
            backgroundImage: `url(${product.bg})` 
          }"
        >
          <span>{{ product.title }}</span>
          <img :src="product.image" alt="Product Image" />
        </nuxt-link>
      </section>
    </section>
  </section>
</template>

<script>

import SectionTitle from './SectionTitle.vue';

export default {
  data() {
    return {
      products: [
        {
          title: 'Food For Future',
          description: 'Decentralized data for funding farmers',
          image: '/fff.png',
          bg: '/fff-bg.jpg',
          status: 'past',
          slug: '/products/food-for-future',
          color: '#9446BD'
        },
        {
          title: 'Doodledapp',
          description: 'No-code smart contract development and deployment',
          image: '/doodledapp.png',
          bg: '/doodledapp-bg.jpg',
          status: 'past',
          slug: '/products/doodledapp',
          color: '#3E74FF'
        },
        {
          title: 'Ultra',
          description: 'Tokenized gaming platform',
          image: '/ultra.png',
          bg: '/ultra-bg.jpg',
          status: 'past',
          slug: '/products/ultra',
          color: '#2E2667'
        },
        {
          title: 'Scatter',
          description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
          image: '/scatter.png',
          bg: '/scatter-bg.jpg',
          status: 'past',
          slug: '/products/scatter',
          color: '#0899FE'
        },          
        {
          title: 'Crisp Tools',
          description: 'A collection of useful tools for designers and developers',
          image: '/crisp-tools.png',
          bg: '/crisp-tools-bg.jpg',
          status: 'current',
          slug: '/products/crisp-tools',
          color: '#D5E7FD'
        },
        {
          title: 'Random Sandwich',
          description: 'A social network based around randomly generated objects',
          image: '/random-sandwich.png',
          bg: '/random-sandwich-bg.jpg',
          status: 'current',
          slug: '/products/random-sandwich',
          color: '#CCA32E'
        },
      ]
    }
  },
  setup() {
    return {
      
    }
  },
  mounted() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // adjust as needed
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.classList.add('animate-out');
        }
      });
    }, options);

    observer.observe(this.$refs.projects);
  },
  components: {
    SectionTitle
  }

}

</script>

<style scoped lang="scss">

@import './assets/variables';

#projects {
  display: flex;
  flex-direction: row;
  margin: $spacing-md auto;

  @media screen and (max-width: 1000px){
    flex-direction: column;
  }

  .talk-to-me {
    display:flex;
    flex-direction: column;
    justify-content: center;
    width:50vw;
    height:100vh;
    z-index: 2;
    position: sticky;
    top:0;

    @media screen and (max-width: 1000px){
      width: 100%;
      height: auto;
      position: relative;
    }

    .together {
      color: $blue;
    }
  }

  .project-steps {
    display:flex;
    flex-direction: column;
    gap: $spacing-md;

    .step {
      display:flex;
      flex-direction: row;
      gap: $spacing-md;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }

      p {
        margin:0;
      }
    }
  }

  .portfolio {
    width:50vw;
    font-size: $font-size-xl;
    font-weight:bold;
    z-index: 2;
    border-radius: $br-lg;

    @media screen and (max-width: 1000px){
      width:100%;
      font-size: $font-size-md;
    }

    .works {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
      gap: $spacing-md; 
      position: relative;

      .single-work {
        height:50vh;
        width:calc(100% - $spacing-md /2);
        background: $white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-decoration: none;
        background-size: cover;
        color:$white !important;
        transition: all 0.3s ease-in-out;
        border-radius: $br-md;
        opacity: 0;
        scale:0.8; 
        position: relative;
        overflow: hidden;
        perspective: 100em;
        transform: rotate3d(0,0,0,15deg);

        @media screen and (max-width: 1400px){
          height:40vh;
        }
        
        @media screen and (max-width: 1200px){
          height:35vh;
        }

        @media screen and (max-width: 1000px){
          width:calc(50% - $spacing-md /2);
          border-radius: $br-sm;
        }

        @media screen and (max-width: 768px){
          width:calc(100% - $spacing-md /2);
          border-radius: $br-sm;
        }

        span {
          position:absolute;
          bottom: $spacing-md;
          left: $spacing-md;
          text-shadow: 2px 2px 2px rgba($black, 0.5);

          @media screen and (max-width: 768px){
            bottom: $spacing-sm;
            left: $spacing-sm;
            font-size: $font-size-md;
          }
        }

        img {
          position:absolute;
          right: -4rem;
          height: 100%;
          transition: all 4s ease-out;
          z-index: -1;
          filter: drop-shadow(0 0 0.75rem rgba($white, 0));
        }

        &:hover {
          box-shadow: inset 0 0 0 1000px rgba($black, 0.2);

          img {
            right: -4rem;
            transform: rotate3d(66, -101, 10, 35deg) scale(1.1);
            filter: drop-shadow(0 0 2rem rgba($white, 1));
          }
        }
      }
    }
  }

}

.animate-in {
  .portfolio {
    .works {
      .single-work {
        animation: projectIn 1s forwards;
      }
    }
  }
}

@keyframes projectIn {
  0% { 
    opacity: 0; 
    scale:0.8; 
  }

  100% { 
    opacity: 1; 
    scale:1; 
  }

}

@keyframes projectOut {
  0% { 
    opacity: 1;
    scale:1; 
  }

  100% { 
    opacity: 0; 
    scale:0.8; 
  }

}

</style>