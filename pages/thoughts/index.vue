<template>
  <main id="Thoughts">
    <section class="w-three-quarters">
      <main class="articles">
        <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug">
          <img :src="article.image" :alt="article.title" />
          <section class="info">
            <span class="title">{{ article.title }}</span>
            <span class="description">{{ article.summary }}</span>
          </section>
        </nuxt-link>
      </main>
    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<script setup>

import articles from '~/assets/articles.json'

</script>

<style scoped lang="scss">

@import './assets/variables';

#Thoughts {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 100rem;
  margin-top: $spacing-lg;
}

.thoughts-hero {
  padding: $spacing-lg 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .intro-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;

    .thoughts-buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0;
      margin-top: $spacing-md;
      animation: fadeInUp 0.5s forwards ease-in-out;
      opacity: 0;
      animation-delay: .65s;

      .arrow-down {
        margin-top: $spacing-md;
        animation: bounce 2s infinite ease-in-out;
      }
      
      .button {
        margin-top: -2px;
      }

      @media screen and (max-width: 600px){
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;

        .button {
          width: 100%;
        }
      }
    }
  }

  p {
    font-size: 4vw;
    line-height: 100%;
    letter-spacing: -0.1rem;
    text-wrap: balance;
    font-family: $font-family-main;
    margin-bottom: $spacing-md;
    color: $black;

    &.small {
      font-size: $font-size-md;
      letter-spacing: 0.1rem;
      font-weight: 500;
      animation: fadeInUp 0.5s forwards ease-in-out;
      animation-delay: .65s;
      opacity: 0;
      margin-bottom: $spacing-sm;
    }

    span {
      display: inline-block;
      animation: zoomBack 0.5s forwards ease-in-out;
      opacity: 0;
      transition: all 0.35s ease-in-out;

      // There are 8 letters, so let's iterate through them and delay each one
      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.025s;
        }
      }
    }

    @media screen and (max-width: 768px){
      font-size: 11vw;
      text-wrap: balance;
    }
  }
}

.articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  width: 100%;
  margin-top: $spacing-lg;
}

    @media screen and (max-width: 1120px) {
      .articles {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: $spacing-md;
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
  font-size: $font-size-lg;
  font-weight: bold;
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
    height: auto;
  }

  img {
    height: 400px;
    width: 100%;
    object-fit: cover;
    transition: all 0.15s ease-in-out;
    outline: 1px solid rgba($black, 0.1);
    border-radius: $br-lg;

    @media screen and (max-width: 768px) {
      height: 320px;
    }
  }

  .info {
    width: 100%;
    display:flex;
    flex-direction: column;
    color: $black;
    padding: $spacing-md 0;
    text-wrap: balance;
    text-align: left;

    .title {
      font-size: $font-size-lg;
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