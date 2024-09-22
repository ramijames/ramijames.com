<template>
  <section class="w-three-quarters page-top">
    <h1 class="">Labs</h1>
    <h4 class="">Technical solutions for various problems that I've encountered over the years.</h4>
  </section>
  <section class="w-three-quarters">
    <main class="labs">
      <nuxt-link :to="`/labs/${lab.slug}`" v-for="lab in labs" :key="lab.slug">
        <img :src="lab.image" :alt="lab.title" />
        <section class="info">
          <span class="title">{{ lab.title }}</span>
        </section>
      </nuxt-link>
    </main>
  </section>
  <PostsExtras />
  <Footer />
</template>

<script>
import labs from '~/assets/labs.json'

export default {
  data() {
    return {
      labs: labs
    }
  }
}
</script>

<style scoped lang="scss">

@import './assets/variables';

.labs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  width: 100%;
  margin-top: $spacing-lg;
}

    @media screen and (max-width: 768px) {
      .labs {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

.labs a {
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
  height: 480px;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    height: 340px;
  }

  &:hover {
    transform: scale(.95);
    outline: 2px solid $blue;
    outline-offset: 10px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .info {
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    display:flex;
    flex-direction: column;
    color: $white;
    background: linear-gradient(to top, rgba($black, 0.8) 0%, rgba($black, 0) 100%);
    padding: $spacing-lg $spacing-lg $spacing-md;
    text-wrap: balance;

    .title {
      font-size: $font-size-xl;
      
      @media screen and (max-width: 1000px){
        font-size: $font-size-lg;
      }
    }
  } 
}

</style>