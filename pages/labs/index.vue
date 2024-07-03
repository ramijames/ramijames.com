<template>
  <section class="w-full">
    <h1 class="center">Labs</h1>
    <h2 class="grey center">Esoteric digital art in CSS, Vue, and GLSL</h2>
    <main class="labs">
      <nuxt-link :to="`/labs/${lab.slug}`" v-for="lab in labs" :key="lab.slug">
        <img :src="lab.image" :alt="lab.title" />
        <span class="title">{{ lab.title }}</span>
        <span class="date">{{ lab.date }}</span>
      </nuxt-link>
    </main>
  </section>
  <PostsExtras />
  <Footer />
</template>

<script>
import labs from '~/assets/labs.json'

export default {
  data() {
    return {
      labs: labs
    }
  }
}
</script>

<style scoped lang="scss">

@import './assets/variables';

.labs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  margin-top: $spacing-lg;
}

    @media screen and (max-width: 768px) {
      .labs {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

.labs a {
  text-decoration: none;
  color: $black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  text-align: center;
  margin-bottom: $spacing-lg;

  img {
    width: 100%;
  }
}

.labs .title {
  margin: 1rem 0 0.5rem;
  font-size: $font-size-lg;
}

.labs .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}

</style>