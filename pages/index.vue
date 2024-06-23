<template>
  <main>
    <SimpleHomepage />
    <Footer />
  </main>
</template>

<script>

import Footer from '/components/Footer.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  components: {
    Footer,
  },
  setup() {
    return {
      
    }
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

</style>