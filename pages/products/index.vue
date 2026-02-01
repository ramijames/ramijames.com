<template>
  <PageHeader title="Product Case Studies" tagline="Some of my favorite work over the years" />
  <Projects />
  <Footer />
</template>

<script>

import Projects from '~/components/Projects.vue'
import Footer from '~/components/Footer.vue'

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
            image: '/scatter.jpg',
            status: 'past',
            slug: '/products/scatter',
            color: '#0899FE'
          },          {
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
  components: {
    Footer
  }

}

</script>

<style scoped>

</style>