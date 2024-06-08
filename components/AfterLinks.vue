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
        <Button text="Get help now" to="https://calendly.com/itsramijames" />
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
  background: linear-gradient(180deg, rgba($white,0.7), rgba($white,0.2));
  backdrop-filter: blur(10px);
  border-radius: $br-md;
  padding: $spacing-xs;
  box-shadow: 0px 2px 0 rgba($teal, 5%), 0px 4px 0 rgba($teal, 25%), 0 2px 0 rgba($white, 0.4);

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
        color: $teal-dark;

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