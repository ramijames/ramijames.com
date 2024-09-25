<template>
  <section class="w-three-quarters page-top">
    <h1 class="">Thoughts</h1>
    <h4 class="">On design, building products, software development, and how we work together.</h4>
  </section>
  <section class="w-three-quarters">
    <nuxt-link :to="`/thoughts/${firstArticle.slug}`" class="first-article">
      <img :src="firstArticle.image" :alt="firstArticle.title" />
      <section class="info">
        <span class="latest">Latest</span>
        <span class="title">{{ firstArticle.title }}</span>
        <span class="description">{{ firstArticle.summary }}</span>
      </section>
    </nuxt-link>
    <main class="articles">
      <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in allArticles" :key="article.slug">
        <img :src="article.image" :alt="article.title" />
        <section class="info">
          <span class="title">{{ article.title }}</span>
          <span class="description">{{ article.summary }}</span>
        </section>
      </nuxt-link>
    </main>
  </section>
  <PostsExtras />
  <Footer />
</template>

<script setup>
import articles from '~/assets/articles.json'

const firstArticle = articles[0]

const allArticles = articles.slice(1)

</script>

<style scoped lang="scss">

@import './assets/variables';

.first-article {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  border: none;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }

  img {
    height: 320px;
    width: 100%;
    max-width: 600px;
    object-fit: cover;
    border: 1px solid rgba($white, 0.1);
  }

  .info {
    display:flex;
    flex-direction: column;
    color: $white;
    padding: $spacing-md;
    align-items: flex-start;
    text-wrap: balance;
    text-align: left;
    gap: $spacing-xs;

    .latest {
      background: $white;
      color: $black;
      padding: $spacing-xxs;
      font-size: $font-size-xs;
      font-weight: 700;
    }

    .title {
      font-size: $font-size-xl;
      font-family: $font-family-main;
      text-decoration: none;
    }

    .description {
      font-size: $font-size-sm;
      margin-top: $spacing-sm;
      opacity: 0.6;
      text-decoration: none;
    }
  }
}

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: $spacing-md;
  width: 100%;
  margin-top: $spacing-lg;
}

    @media screen and (max-width: 1120px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: $spacing-sm;
      }
    }

    @media screen and (max-width: 768px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr;
        gap: $spacing-sm;
        margin-bottom: $spacing-md;
      }
    }

.articles a {
  text-decoration: none;
  color: $black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  text-align: center;
  margin-bottom: $spacing-lg;
  transition: all 0.35s ease-in-out;
  position: relative;

  &:hover {
    img {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    height: 340px;
  }

  img {
    height: 240px;
    width: 100%;
    object-fit: cover;
    transition: all 0.15s ease-in-out;
    border: 1px solid rgba($white, 0.1);

    @media screen and (max-width: 768px) {
      height: 320px;
    }
  }

  .info {
    width: 100%;
    display:flex;
    flex-direction: column;
    color: $white;
    padding: $spacing-md 0;
    text-wrap: balance;
    text-align: left;

    .title {
      font-size: $font-size-xl;
      font-family: $font-family-main;
    }

    .description {
      font-size: $font-size-sm;
      margin-top: $spacing-sm;
      opacity: 0.6;
    }
  }
}

</style>