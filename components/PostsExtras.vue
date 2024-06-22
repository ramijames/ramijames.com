<template>
  <section id="PostsExtras">
    <section class="postContent">
      <img src="/services/iterate.png" alt="Rami James is a nice guy" />
      <h3>Looking for a Product Professional?</h3>
      <p>I'm recruiting new clients and I'd love to hear about what you're working on!</p>
      <Button type="small" text="Set a call" to="/booking" />
    </section>
  </section>
</template>

<style scoped lang="scss">

@import '/assets/variables.scss';

#PostsExtras {
  background: $white-dark;
  width: 100%;
  padding: $spacing-md;
  float: right;
  margin: $spacing-md 0 $spacing-lg;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  .postContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 1000px) {
        align-items: center;
        width: 100%;
    }

    img {
      width: 100px;
    }

    h3 {
      margin-top: 0;
      line-height: 140%;
      margin-bottom: $spacing-xs;
      text-align: center;
    }

    p {
      font-size: $font-size-sm;
      margin-bottom: $spacing-sm;
      line-height: 140%;

      @media screen and (max-width: 768px) {
        text-align: center;
      }
    }
  }
}

.dark #PostsExtras {
  background: $black-dark;
}

</style>