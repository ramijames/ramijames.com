<template>
  <main class="general-main page-top">
    <section class="labs-main general-content">
      <SectionTitle title="Lab Experiments" centered="true" />
      <main class="labs">
        <nuxt-link :to="`/labs/${lab.slug}`" v-for="lab in labs" :key="lab.slug">
          <img :src="lab.image" :alt="lab.title" />
          <span class="title">{{ lab.title }}</span>
          <span class="date">{{ lab.date }}</span>
        </nuxt-link>
      </main>
      <PostsExtras />
    </section>
  </main>
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

.labs-main {
  display: flex;
  flex-direction: column;
  align-items: center;



}

.labs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
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

    @media screen and (max-width: 768px) {
      .labs {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

.single-lab {
  display:flex;
  flex-direction: column;
  width:100%;
}

.single-lab img {
  margin:0;
}

    .single-lab:hover img {
      background-color: $white;
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
}

    .dark .labs a {
      color: #fff;
    }

.labs .title {
  margin: 1rem 0 0.5rem;
  font-size: $font-size-lg;
}

.labs .date {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.5;
}

</style>