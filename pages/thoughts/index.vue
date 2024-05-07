<template>
  <main class="general-main">
    <section class="explanation">
      <h1>Writing is thinking</h1>
      <h4>I find writing a wonderful tool to hone ideas and develop concepts.</h4>
      <p>Topics covered are software development, agile processes, teams working together, my family, and of course, design.</p>
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

<style scoped>

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

    @media screen and (max-width: 1400px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 2rem;
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
  font-size: 1.25rem;
}

.articles .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}

</style>