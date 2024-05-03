<template>
  <main class="articles container">
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
  border: 1px solid rgba(0,0,0,0);
  padding:.3rem;
  height: auto;
  border-radius: .3rem;
  box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
              0 8px 6px rgba(0,0,0,0.06),
              0 12px 12px rgba(0,0,0,0.06);
}

    .dark .single-article img {
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
              0 8px 6px rgba(0,0,0,0.06),
              0 12px 12px rgba(0,0,0,0.06);
    }

    .single-article:hover img {
      border: 1px solid rgba(0,0,0,1);
    }

    .dark .single-article:hover img {
      border: 1px solid rgba(255,255,255,1);
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
  font-weight: normal;
  font-size: 1.5rem;
}

.articles .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}

</style>