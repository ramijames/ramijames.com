<template>
  <section class="w-three-quarters page-top">
    <h1 class="center">Thoughts</h1>
    <h2 class="center grey">On products, teams, software development, and design.</h2>
  </section>
  <section class="w-full">
    <main class="articles">
      <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug">
        <img :src="article.image" :alt="article.title" />
        <span class="title">{{ article.title }}</span>
        <span class="date">{{ article.date }}</span>
      </nuxt-link>
    </main>
  </section>
  <PostsExtras />
  <Footer />
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

<style scoped lang="scss">

@import './assets/variables';

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  width: 100%;
  margin-top: $spacing-lg;
}

    @media screen and (max-width: 768px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

.articles a {
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

.articles .title {
  margin: 1rem 0 0.5rem;
  font-size: $font-size-lg;
}

.articles .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}


</style>