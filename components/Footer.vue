<template>
  <footer>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/logo-light.svg" alt="logo" />
        </div>
        <div class="footer-links">
          <a href="#">Home</a>
          <a href="#">Projects</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
        <div class="footer-social">
          <!-- <a href="#"><img src="~/assets/facebook.svg" alt="facebook" /></a>
          <a href="#"><img src="~/assets/twitter.svg" alt="twitter" /></a>
          <a href="#"><img src="~/assets/instagram.svg" alt="instagram" /></a> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

@import './assets/variables';

footer {
  width: 100vw;
  background: $blue;
  color: $white;
  font-size: $font-size-xs;
  font-family: $font-family-secondary;
  font-weight: bold;
  padding: $spacing-md $spacing-md;

  .footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    padding: $spacing-md;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
  }

  .footer-logo {
    img {
      width: 100px;
    }
  }

  .footer-links {
    a {
      color: $white;
      text-decoration: none;
      margin-right: $spacing-md;
    }
  }

  .footer-social {
    a {
      img {
        width: 20px;
        margin-right: $spacing-md;
      }
    }
  }
}

</style>