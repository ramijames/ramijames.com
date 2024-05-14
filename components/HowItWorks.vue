<template>
  <section id="how-it-works">
    <section class="general-main">
      <section class="how-it-intro">
        <div class="box-super-title">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26Z" stroke="#A131E7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.1849 17.4329V17.1903C12.1898 16.3578 12.2665 15.6941 12.415 15.1993C12.5684 14.7046 12.7911 14.3049 13.0831 14.0005C13.3752 13.696 13.7266 13.4201 14.1373 13.1727C14.4442 12.9824 14.7189 12.785 14.9614 12.5804C15.2039 12.3758 15.3969 12.1499 15.5405 11.9025C15.684 11.6503 15.7558 11.3696 15.7558 11.0604C15.7558 10.7322 15.6741 10.4443 15.5108 10.197C15.3474 9.94957 15.1272 9.75928 14.85 9.62607C14.5778 9.49286 14.2759 9.42626 13.9443 9.42626C13.6226 9.42626 13.3182 9.49524 13.0312 9.63321C12.7441 9.76641 12.509 9.96622 12.3259 10.2326C12.1428 10.4943 12.0438 10.8202 12.029 11.2103H9C9.02475 10.2588 9.26231 9.47383 9.71269 8.85538C10.1631 8.23216 10.7595 7.76832 11.5019 7.46384C12.2442 7.15462 13.0634 7 13.9592 7C14.9441 7 15.8151 7.15699 16.5724 7.47098C17.3296 7.78021 17.9235 8.22978 18.3541 8.8197C18.7847 9.40961 19 10.1208 19 10.9534C19 11.51 18.9035 12.0048 18.7105 12.4377C18.5224 12.8658 18.2576 13.2464 17.9161 13.5794C17.5746 13.9077 17.1712 14.205 16.706 14.4715C16.315 14.6951 15.9933 14.9282 15.7409 15.1708C15.4934 15.4134 15.3078 15.6941 15.1841 16.0128C15.0653 16.3316 15.0035 16.7241 14.9985 17.1903V17.4329H12.1849ZM13.6548 22C13.1599 22 12.7367 21.8335 12.3853 21.5005C12.0389 21.1627 11.8681 20.7583 11.8731 20.2873C11.8681 19.8211 12.0389 19.4215 12.3853 19.0885C12.7367 18.7555 13.1599 18.589 13.6548 18.589C14.125 18.589 14.5382 18.7555 14.8946 19.0885C15.2509 19.4215 15.4316 19.8211 15.4365 20.2873C15.4316 20.6013 15.345 20.8892 15.1767 21.1508C15.0134 21.4077 14.7981 21.6147 14.5308 21.7716C14.2635 21.9239 13.9715 22 13.6548 22Z" fill="#A131E7"/>
          </svg>
          <span>How it works</span>
        </div>
        <div class="box-main-sell">
          <h2>Let's ensure your success</h2>
        </div>
        <div class="box-convince-me">
          <p>I know that you want is to have a clear idea of what you are spending and getting in return, so the process is set up to prioritize your visibility and set predetermined costs.</p>
        </div>

        <section class="process-outline">
          <div class="step">
            <section class="step-image">
              <img src="/hero-discuss.png" alt="Discuss your project">
            </section>
            <section>
              <h4 class="step-title discuss-title">Discuss</h4>
              <p class="step-description">Every project starts with a discussion that helps me understand what your needs are and what you are building.</p>
            </section>
          </div>

          <div class="step">
            <section class="step-image">
              <img src="/hero-subscribe.png" alt="Subscribe">
            </section>
            <section>
              <h4 class="step-title subscribe-title">Subscribe</h4>
              <p class="step-description">Once we have established the scale of work, we can set up a monthly retainer that fits what you are trying to achieve. I am a drop-in replacement for multiple hard-to-fill roles in your organization.</p>
            </section>
          </div>

          <div class="step">
            <section class="step-image">
              <img src="/hero-build.png" alt="Build">
            </section>
            <section>
              <h4 class="step-title build-title">Build</h4>
              <p class="step-description">Together we will iterate through a design process that will help you define your product ensure that it fits your business' needs and the market's desire.</p>
            </section>
          </div>
        </section>
      </section>
      <section class="how-it-illustration">
        <img src="/how-it-illustrates.svg" alt="Clients love it!">
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">

#how-it-works {
  width: 100%;
  padding:4rem 8rem;
  display: flex;
  flex-direction: column;
  margin:0;
  background-color: white;
  background-image: linear-gradient(45deg, #ffffff 40%, #F5F1F6 100%);
  box-shadow: inset 0 0 100px rgba(255,255,255,1);
  position:relative;
  overflow: hidden;
}

    #how-it-works::after {
      position: absolute;
      right:0;
      bottom:0;
      content:'';
      width:30dvw;
      height:30dvw;
      // filter: blur(200px);
      background-color: #E700EC;
      transform: translateX(50%) translateY(-20%) skewX(45%);
      opacity: 0.1;
      border-radius: 0.3rem;
    }

    #how-it-works::before {
      position: absolute;
      right:-10dvw;
      top:-40px;
      content:'';
      width:40dvw;
      height:40dvw;
      // filter: blur(100px);
      background-color: #8C00EC;
      transform: translateX(10%) translateY(-20%) skewX(45%);
      opacity: 0.02;
      border-radius: 0.1rem;
    }

    .dark #how-it-works {
      background-color: rgba(161, 49, 231, 0.179);
      background-image: linear-gradient(45deg, rgba(161, 49, 231, 0.2) 40%, rgba(161, 49, 231, 0.3) 100%);
      box-shadow: inset 0 50px 100px rgba(161, 49, 231, 1);
    }

.box-super-title {
  display:flex;
  flex-direction: row;
  align-items: center;
  gap:1rem;

  svg {
    width:24px;
    height:24px;
  }

  span {
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
  }

}

.box-main-sell {
  h2 {
    margin: 1rem 2rem 1rem 0;
  }
}

.box-convince-me {
  p {
    margin: 1rem 2rem 1rem 0;
  }
}

.how-it-intro {
  width:65%;
}

.process-outline {
  display:flex;
  flex-direction: column;
  gap:4rem;
  margin-top:4rem;

  .step {
    display:flex;
    flex-direction: row;
    gap:2rem;

    img,
    svg {
      width:100px;
      height:100px;
      border-radius: 0.3rem;
    }

    .step-title {
      margin: 0 0 0.25rem;
      font-weight: bold;
    }

        .discuss-title {
          color:#8C00EC;
        }

        .subscribe-title {
          color:#E700EC;
        }

        .build-title {
          color:#40CD0E;
        }

    .step-description {
      margin:0;
    }
  }
}

.how-it-illustration {
  width:35%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(50% - 8rem);
  z-index: 2;
  margin:0 4rem;
  backdrop-filter: blur(8px);
  border-radius: 0.6rem;
  padding:2rem;
  background: linear-gradient(150deg, rgba(161, 49, 231, 0.8) 30%, rgba(161, 49, 231, 0.3) 60%);

  img {
    width:100%;
  }
}


</style>