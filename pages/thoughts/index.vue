<template>
  <main class="articles">
    <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug">
      <img :src="article.image" :alt="article.title" />
      <h3>{{ article.title }}</h3>
    </nuxt-link>
  </main>
</template>

<script>
import articles from '~/assets/articles.json'

export default {
  data() {
    return {
      articles: articles
    }
  }
}
</script>

<style scoped>

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 2rem;
}

.articles img {
  width: 100%;
  height: auto;
}

.articles a {
  text-decoration: none;
  color: #333;
  font-family: 'IBM Plex Mono';
  display: flex;
  flex-direction: column;
  align-items: center;
}

.articles h3 {
  margin: 1rem 0;
}

</style>