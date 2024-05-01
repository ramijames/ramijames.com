<template>
  <main class="posts" :class="{ 'sticky-top': pinned }">
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
          <form action="https://doodledapp.us12.list-manage.com/subscribe/post?u=f081fdb86b92e439e4994e8d6&amp;id=6210f0527f&amp;f_id=00eb4ae0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
            <div id="mc_embed_signup_scroll">
                <!-- <div class="indicates-required"><span class="asterisk">*</span> indicates required</div> -->
                <div class="mc-field-group">
                  <!-- <label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label> -->
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
            <!-- <div class="optionalParent">
              <div class="clear foot">
                <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
                  <p style="margin: 0px auto;"><a href="http://eepurl.com/iPabqQ" title="Mailchimp - email marketing made easy and fun"><span style="display: inline-block; background-color: transparent; border-radius: 4px;"><img class="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" style="width: 220px; height: 40px; display: flex; padding: 2px 0px; justify-content: center; align-items: center;"></span></a></p>
              </div>
            </div> -->
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
    },
    handleScroll() {
      this.pinned = window.scrollY > 300
    }
  }
}
</script>

<style>

.sticky-top {
  position: fixed;
  top: 40px;
  z-index: 100;
  background: white;
  width: 321px;
}

    .dark .sticky-top {
      position: fixed;
      top: 40px;
      z-index: 100;
      background: black;
      width: 321px;
    }

    .sticky-top .mc-field-group input.email {
      border:2px solid #ff53f1;
    }
    
    .dark .sticky-top .mc-field-group input.email {
      border:2px solid #53ff9b;
      box-shadow: inset 0px 0px 4px rgba(255, 247, 0, 0.1), 0px 0px 8px rgba(99, 252, 148, 0.832), 0px 0px 12px rgba(221, 255, 255, 0.3), inset 0px 0px 8px rgba(99, 252, 148, 0.832);
    }

.posts {
  display: flex;
  flex-direction: column;
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
  border:2px solid #0000001b;
  color:black;
  background-color: white;
  border-radius: 8px;
}

    .mc-field-group input.email:hover {
      border:2px solid black;
    }

    .mc-field-group input.email:focus-visible {
      border:2px solid #ff53f1;
      outline: none;
    }

    .dark .mc-field-group input.email {
      border:2px solid white;
      color:white;
      background-color: black;
    }

    .dark .mc-field-group input.email:focus-visible {
      border:2px solid #53ff9b;
      outline: none;
    }

.mc-field-group input.button {
  padding:0.2rem 0.5rem;
  color:white;
  background-color: #ff53f1;
  border:2px solid #ff53f1;
  border-radius: 4px;
  position: absolute;
  right: 0.4rem;
  top:.4rem;
}

    .dark .mc-field-group input.button {
      background-color: #53ff9b;
      border:2px solid #53ff9b;
      color:black;
    }


</style>