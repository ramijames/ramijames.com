<template>
  <main class="articles">
    <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug" class="single-article">
      <img :src="article.image" :alt="article.title" />
      <span class="title">{{ article.title }}</span>
      <span class="date">{{ article.date }}</span>
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

    @media screen and (max-width: 768px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 0rem;
      }
    }

.single-article {
  display:flex;
  flex-direction: column;
  width:100%;
}

.single-article img {
  width: 100%;
  height: auto;
  border: 2px solid black;
  border-radius: 4px;
}

    .dark .single-article img {
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    .single-article:hover img {
      border: 2px solid rgb(255, 255, 255);
    }

    .dark .single-article:hover img {
      border: 2px solid rgba(255,255,255,1);
    }

.articles a {
  text-decoration: none;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  text-align: center;
}

    .dark .articles a {
      color: #fff;
    }

.articles .title {
  margin: 1rem 0 0.5rem;
  font-weight: bold;
}

.articles .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}

</style>