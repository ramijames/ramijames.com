<template>
  <Projects />
  <!-- <main class="general-main">
    <section class="explanation">
      <h1 class="general-bold">Every product has its story</h1>
      <h4>I like to build in public, with a short iteration cycle and direct feedback from users.</h4>
      <p>Each product shifts and changes as it achieves either market fit or contribution to the dustbin of history.</p>
    </section>
    <section class="general-content">
      <section class="stories">
        <nuxt-link class="single-story" v-for="product in products" :key="product.title" :to="product.slug">
          <div class="book">
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
          <div class="single-description">{{ product.description }}</div>
        </nuxt-link>
      </section>
    </section>
  </main> -->
</template>

<script>

import Projects from '~/components/Projects.vue'

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
  }

}

</script>

<style scoped>

</style>