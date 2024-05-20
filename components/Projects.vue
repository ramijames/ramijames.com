<template>
  <section id="projects">
    <section class="talk-to-me" ref="talkToMe">
      <div>I MAKE INTERFACES</div>
      <div>FOR THE FUTURE,</div>
      <div class="together">WITH YOU IN MIND.</div>
    </section>
    <section class="portfolio" ref="portfolio">
      <section class="works">
        <nuxt-link class="single-work" v-for="product in products" :key="product.title" :to="product.slug" :style="{ backgroundColor: product.color, backgroundImage: `url(${product.image})` }">
          {{ product.title }}
          <!-- <div class="book">
            <div class="cover">
              <div class="color" :style="{ backgroundColor: product.color }"></div>
              <div class="single-image">
                <img :src="product.image" alt="Product Image">
              </div>
            </div>
            <div class="pages"></div>
          </div>
          <div class="intro">The story of</div>
          <div class="single-title">{{ product.title }}</div>
          <div class="single-description">{{ product.description }}</div> -->
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
          image: '/foodforfuture.jpg',
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
          image: '/scatter.png',
          status: 'past',
          slug: '/products/scatter',
          color: '#0899FE'
        },          
        {
          title: 'Crisp Tools',
          description: 'A collection of useful tools for designers and developers',
          image: '/crisptools.jpg',
          status: 'current',
          slug: '/products/crisp-tools',
          color: '#D5E7FD'
        },
        {
          title: 'Random Sandwich',
          description: 'A social network based around randomly generated objects',
          image: '/randomsandwich.jpg',
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
  methods: {
  handleScroll() {
    const talkToMeTop = this.$refs.talkToMe.getBoundingClientRect().top;
    const portfolioBottom = this.$refs.portfolio.getBoundingClientRect().bottom;

    if (talkToMeTop <= window.innerHeight * 0.2 && portfolioBottom >= window.innerHeight * 0.2) {
      this.$refs.talkToMe.style.position = 'fixed';
      this.$refs.talkToMe.style.top = '20vh';
    } else {
      this.$refs.talkToMe.style.position = 'static';
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
},

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
    gap: $spacing-lg;
    width:50vw;
    height:100vh;
    padding: $spacing-lg;
    color:$black;
    font-size: $font-size-xl;
    font-weight:normal;
    text-transform: uppercase;
    z-index: 2;
    position: sticky;
    top:0;

    .together {
      color: $blue;
    }
  }

  .portfolio {
    width:50vw;
    padding: $spacing-lg;
    background: $black;
    font-size: $font-size-md;
    font-weight:bold;
    text-transform: uppercase;
    z-index: 2;

    .works {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap; 
      gap: $spacing-md; 

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
    background: $black;
  }
}

</style>