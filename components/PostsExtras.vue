<template>
  <section id="PostsExtras">
    <section class="postContent">
      <img src="/services/ai.png" alt="Rami James is a nice guy" />
      <h3>I'm actively looking for work!</h3>
      <p>If you need a product specialist, designer, or front-end developer, please reach out.</p>
      <Button type="small" text="Email Me" to="mailto:ramijames@gmail.com" />
    </section>
  </section>
</template>

<style scoped lang="scss">

@import '/assets/variables.scss';

#PostsExtras {
  background: rgba(lighten($black, 1.5%), 0.4);
  border-top: 1px solid $white;
  width: 100%;
  padding: $spacing-lg $spacing-md;
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
      margin: 0 auto $spacing-md;
    }

    h3 {
      margin-top: 0;
      line-height: 140%;
      margin-bottom: $spacing-xs;
      text-align: center;
    }

    p {
      font-size: $font-size-sm;
      margin-bottom: $spacing-md;
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