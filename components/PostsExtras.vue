<template>
  <section id="PostsExtras">
    <img src="/public/services/team.png" alt="Trello is nice">
    <section class="postContent">
      <h4>Are you a struggling founder?</h4>
      <p>I'm <nuxt-link to="/about">highly experienced</nuxt-link> with <nuxt-link to="/products">many projects</nuxt-link> under my belt, and am currently accepting new clientele. I'd love for us to build something great together!</p>
      <Button type="small" text="Let's talk" to="https://calendly.com/itsramijames" />
    </section>
  </section>
</template>

<style scoped lang="scss">

@import '/assets/variables.scss';

#PostsExtras {
  background-color: $black;
  backdrop-filter: blur(10px);
  width: 100%;
  padding: $spacing-sm;
  float: right;
  border-radius: $br-md;
  margin: $spacing-md 0 $spacing-lg;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-width: 1px;
  border-style: solid;
  background: url('/public/textures/texture-3-bg.png') padding-box,
              linear-gradient(140deg, lighten($blue-light, 20%) -5%, lighten($white,3%) 15%) border-box;
  border-radius: $br-md;
  border: 4px solid transparent;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 140px;
    background: transparent;
    box-shadow: none;
    margin-right: $spacing-md;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
      width: 100px;
      margin-right:0;
      margin-bottom: $spacing-md;
    }
  }

  .postContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h4 {
      font-weight: 700;
      font-size: $font-size-lg;
      margin-bottom: $spacing-xs;
      color: $mint-dark;

      @media screen and (max-width: 768px) {
        font-size: $font-size-md;
      }
    }

    p {
      font-size: $font-size-sm;
      margin-bottom: $spacing-sm;
      line-height: $spacing-sm * $multiplier;
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