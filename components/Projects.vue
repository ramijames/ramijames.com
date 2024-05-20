<template>
  <section id="projects" ref="projects">
    <section class="talk-to-me" ref="talkToMe">
      <div>I MAKE INTERFACES</div>
      <div>FOR THE FUTURE,</div>
      <div class="together">WITH YOU IN MIND.</div>
    </section>
    <section class="portfolio" ref="portfolio">
      <section class="works">
        <nuxt-link 
          class="single-work" 
          v-for="(product, index) in products" 
          :key="product.title" 
          :to="product.slug" 
          :style="{ 
            animationDelay: index * 0.4 + 's', 
            backgroundColor: product.color, 
            backgroundImage: `url(${product.image})` 
          }"
        >
          {{ product.title }}
        </nuxt-link>
      </section>
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      products: [
        {
          title: 'Food For Future',
          description: 'Decentralized data for funding farmers',
          image: '/fff.jpg',
          status: 'past',
          slug: '/products/food-for-future',
          color: '#9446BD'
        },
        {
          title: 'Doodledapp',
          description: 'No-code smart contract development and deployment',
          image: '/doodledapp.jpg',
          status: 'past',
          slug: '/products/doodledapp',
          color: '#3E74FF'
        },
        {
          title: 'Ultra',
          description: 'Tokenized gaming platform',
          image: '/ultra.jpg',
          status: 'past',
          slug: '/products/ultra',
          color: '#2E2667'
        },
        {
          title: 'Scatter',
          description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
          image: '/scatter.jpg',
          status: 'past',
          slug: '/products/scatter',
          color: '#0899FE'
        },          
        {
          title: 'Crisp Tools',
          description: 'A collection of useful tools for designers and developers',
          image: '/crisp-tools.jpg',
          status: 'current',
          slug: '/products/crisp-tools',
          color: '#D5E7FD'
        },
        {
          title: 'Random Sandwich',
          description: 'A social network based around randomly generated objects',
          image: '/random-sandwich.jpg',
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
  }

}

</script>

<style scoped lang="scss">

@import './assets/variables';

#projects {
  display: flex;
  flex-direction: row;
  width:100vw;
  background: $white;

  @media screen and (max-width: 768px){
    flex-direction: column;
  }

  .talk-to-me {
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-xs;
    width:50vw;
    height:100vh;
    padding: $spacing-lg;
    color:$black;
    font-size: $font-size-xxl;
    font-weight:bold;
    text-transform: uppercase;
    z-index: 2;
    position: sticky;
    top:0;

    @media screen and (max-width: 768px){
      width:100vw;
      height:calc($spacing-xl + 30vh);
      font-size: 6dvw;
      // padding-top: calc($spacing-xl + 2rem);
      position: relative;
    }

    .together {
      color: $blue;
    }
  }

  .portfolio {
    width:50vw;
    padding: $spacing-lg;
    background: $black;
    font-size: $font-size-xl;
    font-weight:bold;
    text-transform: uppercase;
    z-index: 2;

    @media screen and (max-width: 768px){
      width:100vw;
      padding: $spacing-md;
      font-size: $font-size-md;
    }

    .works {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
      gap: $spacing-md; 
      position: relative;

      @media screen and (max-width: 768px){
        gap: $spacing-md;
      }

      .single-work {
        height:50vh;
        width:calc(100% - $spacing-md /2);
        background: $white;
        padding: $spacing-md;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-decoration: none;
        background-size: cover;
        color:$white !important;
        transition: all 0.3s ease-in-out;
        border-radius: $br-lg;
        opacity: 0;
        scale:0.8; 
        position: relative;

        @media screen and (max-width: 1400px){
          height:40vh;
        }
        
        @media screen and (max-width: 1200px){
          height:35vh;
        }

        @media screen and (max-width: 768px){
          width: 100%;
          border-radius: $br-sm;
        }
      }
    }
  }

}

.dark #projects {
  background: $black;

  .talk-to-me {
    color:$white;

    .together {
      color: $blue-light;
    }
  }

  .portfolio {
    background: $white;
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