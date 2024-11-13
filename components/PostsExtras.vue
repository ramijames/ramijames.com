<template>
  <section id="PostsExtras">
    <section class="postContent">
      <img src="/vewrite.png" alt="Vewrite - project management for technical writers" />
      <h3>Project Management for Technical Writers</h3>
      <p>Vewrite, project management tailored for technical writing teams, is launching soon. Make sure to sign up for the waitlist so that you can be notified when the product launches.</p>
      <a href="https://vewrite.com/" class="button large">Check it out</a>
    </section>
  </section>
</template>

<style scoped lang="scss">

@import '/assets/variables.scss';

#PostsExtras {
  background: $white;
  width: 100%;
  padding: 0 0 $spacing-lg ;
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
      width: 100%;
      border-radius: 0;
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
      margin: 0 $spacing-lg $spacing-md;
      line-height: 140%;
      text-align: center;

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