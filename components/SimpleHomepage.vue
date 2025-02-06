<template>
  <main id="Hero" class="w-three-quarters">
    <!-- <spline-viewer class="mega-rotate" url="https://prod.spline.design/9UnGpupziB04gPII/scene.splinecode"></spline-viewer> -->
    <section class="mega-hero">
      <section class="intro-left">
        <h1>Developer, Advocate, and DevRel Expert</h1>
        <p>My core focus over the last decade has been building technical tools that are easy to use and loved by developers. Much of that work has been developer advocacy and relations. I've developed some strong opinions on the right and wrong way to do things. You can read about some of those opinions below.</p>
        <p> I'm currently building <a href="https://www.vewrite.com">Vewrite</a>, a project management tool for technical writing teams.</p>
      </section>
      <section class="intro-right">
        <img src="/rami_small_white.png" alt="Rami James" />
      </section>
    </section> 
  </main>
  <section id="Writing" class="w-three-quarters">
    <section class="writing-intro">
      <h2>Thoughts on Software, Docs, and DevRel</h2>
      <p>I tend to write about my work, developer advocacy, and how we are supposed to think about the things that we do in our professional spheres. Some of these pieces have taken on a life of their own and sparked wider discussions within our community. Here you can find some of my favorites.</p>
    </section>
    <main class="articles">
      <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in selected_articles" :key="article.slug">
        <img :src="article.image" :alt="article.title" />
        <section class="info">
          <span class="title">{{ article.title }}</span>
          <span class="description">{{ article.summary }}</span>
        </section>
      </nuxt-link>
    </main>
  </section>
  <section id="RecentWork" class="w-three-quarters">
    <section class="work-intro">
      <h2>Recent Work</h2>
      <p>Over the past decade, I've founded or co-founded multiple startups, and have held leadership positions that helped guide products and teams towards success. Below you'll find some more in-depth descriptions of what those startups were, what they were trying to achieve, and my place within those contexts.</p>
    </section>
    <MergedProjects />
  </section>
  
</template>

<script setup>

import selected_articles from '~/assets/selected_articles.json'

</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

#Hero {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .mega-rotate {
    width: 100%;
    height: 50vh;
  }

  .mega-hero {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    margin: $spacing-lg auto;
    gap: $spacing-lg;
    padding: 0 $spacing-md;

    @media screen and (max-width: 768px){
      flex-direction: column-reverse;
      gap: $spacing-md;
    }
    
    .intro-left {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: $spacing-sm;

      h1 {
        font-size: $font-size-max;
      }

      @media screen and (max-width: 768px){
        width: 100%;
      }
    }

    .intro-right {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-md;

      @media screen and (max-width: 768px){
        width: 100%;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    
  }

  h2 {
    margin-top: 0;
    line-height: 140%;

    @media screen and (max-width: 768px){
      font-size: $font-size-lg;
    }
  }

}

#Writing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: $spacing-lg auto;
  gap: $spacing-lg;
  padding: $spacing-lg;
  border-radius: $br-lg;
  min-height: 600px;

  @media screen and (max-width: 768px){
    flex-direction: column-reverse;
    gap: $spacing-md;
  }
  
  .writing-intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    ul {
      margin: $spacing-lg 0;

      li {
        list-style: none;
        margin-bottom: $spacing-md;

        a {
          text-decoration: none;
          font-weight: bold;
          font-size: $font-size-md;
          color: $black;
        }
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
        font-weight: normal;
      }
    }
  }

  
}

#RecentWork {
  display: flex;
  flex-direction: column;
  margin: $spacing-lg auto;

  .work-intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 $spacing-md;
  }

  h3 {
    padding: 0 $spacing-md;
  }
  
  
}

</style>