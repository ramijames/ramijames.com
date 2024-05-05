<template>
  <main class="posts">
    <div id="mc_embed_shell">
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
      </div>
  
    <h4>Random Thoughts</h4>
    <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in articles" :key="article.slug" class="single-post">
      <span class="title">{{ article.title }}</span>
    </nuxt-link>
  </main>
</template>

<script>
import articles from '~/assets/articles.json'

export default {
  data() {
    return {
      articles: [],
      pinned: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.articles = this.getRandomArticles(articles, 5)
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
  }
}
</script>

<style>

.sticky-top {
  position: fixed;
  top: 120px;
  z-index: 100;
  width: 321px;
}

    .dark .sticky-top {
      position: fixed;
      top: 120px;
      z-index: 100;
      width: 321px;
    }

    .sticky-top .mc-field-group input.email {
      border:1px solid #00000024;
    }
    
    .dark .sticky-top .mc-field-group input.email {
      border:1px solid #ffffff24;
    }

.posts {
  display: flex;
  flex-direction: column;
  transition: all 1s ease-in-out;
  position: sticky;
  top:80px;
  z-index: 210;
}

.single-post {
  padding: 1rem 0 0;
  text-decoration: none;
  font-size:1rem;
  color:#000;
}

    .dark .single-post {
      color: #fff;
    }

.mc-field-group {
  width:100%;
  position: relative;
  margin:0;
}

.mc-field-group input.email {
  width:calc(100% - 1rem - 4px);
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