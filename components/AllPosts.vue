<template>
  <main class="posts">
    <!-- <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form action="https://doodledapp.us12.list-manage.com/subscribe/post?u=f081fdb86b92e439e4994e8d6&amp;id=6210f0527f&amp;f_id=00eb4ae0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
          <div id="mc_embed_signup_scroll">
            <div class="mc-field-group">
              <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="your@email.com">
              <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
            </div>
            <div hidden=""><input type="hidden" name="tags" value="10528644"></div>
            <div id="mce-responses" class="clear foot">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input type="text" name="b_f081fdb86b92e439e4994e8d6_6210f0527f" tabindex="-1" value="">
            </div>
          </div>
        </form>
      </div>
    </div> -->
    
    <!-- <Seeking /> -->

    <!-- <h4>Similar articles</h4>
    <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug" class="single-post">
      <span class="title">{{ article.title }}</span>
    </nuxt-link> -->
  </main>
</template>

<script>
import articles from '~/assets/articles.json'
import Seeking from './Seeking.vue'
import Button from './Button.vue'

export default {
  data() {
    return {
      articles: [],
      pinned: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.articles = this.getRandomArticles(articles, 3)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getRandomArticles(arr, n) {
      let result = new Array(n),
          len = arr.length,
          taken = new Array(len)
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available")
      while (n--) {
          let x = Math.floor(Math.random() * len)
          result[n] = arr[x in taken ? taken[x] : x]
          taken[x] = --len in taken ? taken[len] : len
      }
      return result
    }
  },
  components: {
    Button,
    Seeking
  }
}
</script>

<style lang="scss">

@import './assets/variables';

.posts {
  display: flex;
  flex-direction: column;
  transition: all 1s ease-in-out;
  position: sticky;
  top: calc($spacing-xl + 2rem);
  z-index: 210;
}

.mc-field-group {
  width:100%;
  position: relative;
  margin:0;
}

.mc-field-group input.email {
  width: 100%;
  padding:.6rem 0.5rem;
  margin:0 0 1rem;
  border:1px solid #0000001b;
  color:black;
  background-color: white;
  border-radius: 8px;
}

    .mc-field-group input.email:hover {
      border:1px solid black;
    }

    .mc-field-group input.email:focus-visible {
      border:1px solid #ff53f1;
      outline: none;
    }

    .dark .mc-field-group input.email {
      border:1px solid white;
      color:white;
      background-color: transparent;
    }

    .dark .mc-field-group input.email:focus-visible {
      border:1px solid #ffffff;
      outline: none;
    }

.mc-field-group input.button {
  padding:0.2rem 0.5rem;
  position: absolute;
  right: 0.6rem;
  top:.4rem;
}


</style>