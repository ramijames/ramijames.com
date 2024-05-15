<template>
  <main class="general-main">
    <section class="explanation">
      <h1 class="thoughts-bold">Writing is thinking</h1>
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

h1.thoughts-bold {
  text-align: left;
  font-weight: bold;
  margin:0;
  padding:0 0 0.5rem;
  z-index: 200;
  animation: animatedBackground 5s ease-in-out infinite;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  background-image: linear-gradient(90deg, rgb(161, 49, 231), #d81515, #7523e1, rgb(161, 49, 231)) !important;
  background-size: 300% !important;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

    @media screen and (max-width: 768px) {
      h1.thoughts-bold {
        font-size: 4rem;
        line-height: 3.5rem;
        padding:0 0 1rem;
      }
      
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
      border: 1px solid #A131E7;
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