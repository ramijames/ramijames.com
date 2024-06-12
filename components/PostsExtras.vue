<template>
  <section id="PostsExtras">
    <section class="postContent">
      <h3>Become a <span class="highlight">Product-first</span> Company</h3>
      <p>Help your organization build the right thing for the right reasons.</p>
      <Button type="small" text="Learn more" to="/" />
    </section>
  </section>
</template>

<style scoped lang="scss">

@import '/assets/variables.scss';

#PostsExtras {
  background-color: $black;
  backdrop-filter: blur(10px);
  width: 100%;
  padding: $spacing-md;
  float: right;
  border-radius: $br-md;
  margin: $spacing-md 0 $spacing-lg;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: url('/public/product-first-bg.png') no-repeat top right;
  background-size: cover;
  border-radius: $br-md;

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

.dark #PostsExtras {
  background: url('/public/textures/texture-3-bg-dark.png') padding-box,
              linear-gradient(140deg, $blue-dark -5%, lighten($black,5%) 15%) border-box;

  h4 {
    color:$blue-light;
  }
}

</style>