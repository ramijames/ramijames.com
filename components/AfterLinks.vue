<template>
  <section class="after-links">
    <section class="links">
      <section class="links-row">
        <a href="#recentwork">
          <span class="title">Portfolio</span>
        </a>
        <a href="#methodology">
          <span class="title">Method</span>
        </a>
        <a href="#questions">
          <span class="title">Questions</span>
        </a>
        <Button text="Book a call" to="https://calendly.com/itsramijames" type="small" />
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

.after-links {
  margin-top: $spacing-sm;
  z-index: 10000;
  position: fixed;
  bottom: $p-desktop;
  background-color: rgba($blue, 0.65);
  border-radius: $br-md;
  padding: $spacing-xs;
  backdrop-filter: blur(10px);

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
      gap: $spacing-lg;
      flex-direction: row;
      
      @media screen and (max-width: 768px){
        gap: $spacing-sm;
        padding: 0 $spacing-sm;
      }

      a {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        text-decoration: none;
        font-family: $font-family-main, 'sans-serif';
        font-weight: 500;
        font-size: $font-size-md;
        color: $white;

        @media screen and (max-width: 768px){
          font-size: 2.5dvw;
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