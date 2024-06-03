<template>
  <main class="general-main page-top">
    <section class="general-content">
      <SectionTitle title="Thoughts" subtitle="On software and product development" centered="true" />
      <main class="articles">
        <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug">
          <img :src="article.image" :alt="article.title" />
          <span class="title">{{ article.title }}</span>
          <span class="date">{{ article.date }}</span>
        </nuxt-link>
      </main>
    </section>
  </main>
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
  color: $blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  text-align: center;
  margin-bottom: $spacing-lg;
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