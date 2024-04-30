<template>
  <main class="posts">
    <h4>Other Thoughts</h4>
    <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug" class="single-post">
      <span class="title">{{ article.title }}</span>
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

<style>

.posts {
  display: flex;
  flex-direction: column;
}

.single-post {
  padding: 1rem 0 0;
  text-decoration: none;
  font-size:1rem;
  color:#000;
}

    .dark .single-post {
      color: #fff;
    }

</style>