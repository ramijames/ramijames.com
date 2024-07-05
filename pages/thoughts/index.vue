<template>
  <section class="w-three-quarters page-top">
    <h1 class="center">Thoughts</h1>
    <h2 class="center grey">On products, teams, software development, and design.</h2>
  </section>
  <section class="w-full">
    <main class="articles">
      <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug">
        <img :src="article.image" :alt="article.title" />
        <section class="info">
          <span class="title">{{ article.title }}</span>
        </section>
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
  transition: all 0.35s ease-in-out;
  position: relative;
  outline: 2px solid transparent;

  &:hover {
    transform: scale(.95);
    outline: 2px solid $blue;
    outline-offset: 10px;
  }

  img {
    width: 100%;
  }

  .info {
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    display:flex;
    flex-direction: column;
    color: $white;
    background: rgba($white,0);
    backdrop-filter: blur(20px);
    padding: $spacing-lg $spacing-lg $spacing-md;
    text-wrap: balance;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 35%);

    .title {
      font-size: $font-size-xl;

      @media screen and (max-width: 1000px){
        font-size: $font-size-lg;
      }
    }
  }
}

</style>