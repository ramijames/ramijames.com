<template>
  <main class="general-main">
    <section class="explanation">
      <h1 class="general-bold center">On software and product development</h1>
      <p class="center">Topic that I commonly cover are software, product development, agile processes, how teams work together, my kids and family, and of course, user experience and interface design.</p>
    </section>
    <section class="general-content">
      <main class="articles">
        <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug" class="single-article">
          <img :src="article.image" :alt="article.title" />
          <span class="title">{{ article.title }}</span>
          <span class="date">{{ article.date }}</span>
        </nuxt-link>
      </main>
    </section>
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

<style scoped lang="scss">

@import './assets/variables';

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

    @keyframes animatedBackground {
      0% {
        background-position:0 50%;
      }
      50% {
        background-position:50% 50%;
      }
      100% {
        background-position:0 50%;
      }
    }

    @media screen and (max-width: 1400px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

.single-article {
  display:flex;
  flex-direction: column;
  width:100%;
}

.single-article img {
  margin:0;
}

    .single-article:hover img {
      background-color: $white;
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
  font-size: 1.25rem;
}

.articles .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}

</style>