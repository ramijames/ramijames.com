<template>
  <section id="PostsExtras">
    <section class="postContent">
      <h3>Looking for a Product Professional?</h3>
      <p>I'm recruiting new clients. I'd love to hear what you're working on!</p>
      <Button type="small" text="Set a call" to="/booking" />
    </section>
  </section>
</template>

<style scoped lang="scss">

@import '/assets/variables.scss';

#PostsExtras {
  background: linear-gradient(140deg, $blue-dark -5%, lighten($black,5%) 15%) border-box;
  width: 100%;
  padding: $spacing-md;
  float: right;
  margin: $spacing-md 0 $spacing-lg;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    background: $teal-dark;
  }

  .postContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media screen and (max-width: 1000px) {
        align-items: center;
        width: 100%;
    }

    h3 {
      font-weight: 700;
      margin-top: 0;
      line-height: 100%;
      margin-bottom: $spacing-xs;
      color: $white;

      .highlight {
        color: $red;
      }

      @media screen and (max-width: 1000px) {
        font-size: 30px !important;
      }
    }

    p {
      font-size: $font-size-sm;
      margin-bottom: $spacing-sm;
      line-height: $spacing-sm * $multiplier;
      color: white;

      @media screen and (max-width: 768px) {
        text-align: center;
      }
    }
  }
}

</style>