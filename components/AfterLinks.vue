<template>
  <transition name="fade">
    <section class="after-links"  v-show="!atBottom">
      <section class="links">
        <section class="links-row">
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
                </div>
            </form>
            </div>
          </div>
        </section>
      </section>
    </section>
  </transition>
</template>

<script>

export default {
  data() {
    return {
      atBottom: false,
    };
  },
  methods: {
    checkScroll() {
      this.atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScroll);
  },
};

</script>

<style scoped lang="scss">

@import './assets/variables';

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.after-links {
  z-index: 10000;
  position: fixed;
  bottom: 0;
  background: rgba($white-dark, 0.6);
  backdrop-filter: blur(10px);
  border-radius: $br-md $br-md 0 0;
  padding: $spacing-xs;
  box-shadow: 0 10px 10px rgba($black, 0.24);
  border-top: 1px solid rgba($white, 0.3);

  @media screen and (max-width: 768px){
    bottom: 0;
    border-radius: 0;
    width: 100vw;
  }

  .links {

    .links-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      .mc-field-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 0;
        width: 100%;
        gap: $spacing-xs;

        @media screen and (max-width: 768px){
          flex-direction: row;
          align-items: center;
        }
      }

      input {
        padding: $spacing-xs;
        border-radius: $br-sm;
        border: 1px solid rgba($white, 0.1411764706);
        font-size: $font-size-md;
        background: $teal;
        color: $white;
        margin: 0;
      }

      #mc_embed_shell,
      #mc_embed_signup,
      #mc-embedded-subscribe-form, 
      #mc_embed_signup_scroll {
        width: 100%;
      }

      #mce-EMAIL {
        width: inherit;
      }

      #mc-embedded-subscribe {
        cursor:pointer;
        transition: all 0.3s ease-in-out;
        text-decoration: none;
        border-radius: $br-sm;
        color: $white;
        font-family: $font-family-main, sans-serif;
        font-weight: 500;
        font-size: $font-size-sm;
        background: $red-dark;
        margin: 0;
        width: auto;

        @media screen and (max-width: 768px){
          padding-left: $spacing-xs;
          padding-right: $spacing-xs;
        }
      }

      a {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        text-decoration: none;
        font-family: $font-family-main, 'sans-serif';
        font-weight: 500;
        font-size: $font-size-md;
        color: $teal-dark;

        @media screen and (max-width: 768px){
          font-size: $font-size-sm;
        }

        &:first-child {
          margin-left: $spacing-md;

          @media screen and (max-width: 768px){
            margin-left: 0;
          }
        }
      }

      .number {
        display:none;
      }
    }
  }
}

</style>