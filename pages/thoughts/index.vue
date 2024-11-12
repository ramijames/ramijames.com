<template>
  <main id="Thoughts">
    <!-- <div class="mask">
      <div id="mesh-gradient" class="sixteen-elements">
        <div class="element" v-for="n in 160" :key="n"></div>
      </div>
    </div> -->
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
  </main>
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
    border: 1px solid rgba($black, 0.5);

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  }

  .info {
    display:flex;
    flex-direction: column;
    color: $black;
    padding: $spacing-md;
    align-items: flex-start;
    text-wrap: balance;
    text-align: left;
    gap: $spacing-xs;

    @media screen and (max-width: 768px) {
      padding: $spacing-md 0;
    }

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
    height: auto;
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

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: -1;
  mask-image: linear-gradient( rgba(0,0,0,0) 5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%);
}

#mesh-gradient.sixteen-elements {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  z-index: -10;
  align-items: center;
  justify-content: center;;
  opacity: 1;
  position: fixed;
  pointer-events: none;
  top:0;
  left:0;
  right:0;
  animation: rotateGroup 120s linear infinite;

  @media screen and (max-width: 768px){
    display: none;
  }

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 120 {
    $hue: ($i - 1) * calc(360 / 60);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      // background: linear-gradient(to bottom, rgba($color,0) 55%, rgba($color,.8));
      border: 1px solid rgba($color, .4);
      animation-delay: -#{$i * .15}s;
      width: 1dvw;
      height: 1dvw;
      border-radius: 1rem;
      align-self: center;
      justify-self: center;
    }
  }

  .element {
    animation: sixteen-elements 10s linear infinite;
  }

  @keyframes rotateGroup {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
}

</style>