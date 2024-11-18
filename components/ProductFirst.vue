<template>

  <section id="ProductFirstTitle" class="w-full">
    <h2 class="center">Are you building the right thing?</h2>
  </section>

  <section id="ProductFirstIntro" class="w-three-quarters">

    <section class="left">
      <h3>Improve your product process</h3>
      <p>To get your vision into the hands of users, you need a clear idea of what you are building, why you are building it, a roadmap for how you want to get there, and a clear process that gets you there. I can help you with:</p>
      <ul>
        <li>Comprehensive Product Vision</li>
        <li>Thoughtful Roadmap Building</li>
        <li>User-focused Feature Definition</li>
        <li>Excellent Design & Development</li>
      </ul>
      <Button text="Get started" to="/booking" class="large primary" />
    </section>
    <section class="flow-diagram">
      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/add.png" alt="Product team illustration" />
      </div>
      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/calendar.png" alt="Product team illustration" />
      </div>
      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/ok.png" alt="Product team illustration" />
      </div>
      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/iterate.png" alt="Product team illustration" />
      </div>
    </section>
  </section>

  <!-- <section id="BuildTheRightThing" class="general-main">
    
    <section class="service w-full">
      <img class="centered" src="/services/success.png" alt="Subscribe and request as many designs as you need.">
      <section>
        <h2>Define your Product Vision</h2>
        <h3>Can you tell me in 10 words or less what you are building?</h3>
        <p class="center w-two-thirds">Your Product Vision is a foundational component of how you define features, market your product, and build your user base. I’ve developed a unique three part process that will help you hone in on your perfect Product Vision.</p>
      </section>
      <Button class="centered large" text="Let's define your Product Vision" to="/booking" />
    </section>

    <section class="service w-full">
      <img class="centered" src="/services/budget.png" alt="Calculator illustration">
      <section>
        <h2 class="center">Be Data-driven</h2>
        <h3 class="center">How are you validating that your users need what you are building?</h3>
        <p class="center w-two-thirds">You should have a process in place that allows you to get insights from your users, convert that into a product roadmap, and validate with data. I have developed a framework for how this should be done, and can help your team implement it quickly.</p>
      </section>
      <section class="data-steps">
        <div class="single-step">
          <svg width="53" height="39" viewBox="0 0 53 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 22L16.2929 35.2929C16.6834 35.6834 17.3166 35.6834 17.7071 35.2929L50 3" stroke="#7D4793" stroke-width="5" stroke-linecap="round"/>
          </svg>
          <h4>Build your product roadmap</h4>
        </div>
        <div class="single-step">
          <svg width="53" height="39" viewBox="0 0 53 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 22L16.2929 35.2929C16.6834 35.6834 17.3166 35.6834 17.7071 35.2929L50 3" stroke="#7D4793" stroke-width="5" stroke-linecap="round"/>
          </svg>
          <h4>Set up an insights channel</h4>
        </div>
        <div class="single-step">
          <svg width="53" height="39" viewBox="0 0 53 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 22L16.2929 35.2929C16.6834 35.6834 17.3166 35.6834 17.7071 35.2929L50 3" stroke="#7D4793" stroke-width="5" stroke-linecap="round"/>
          </svg>
          <h4>Set up your validation methodology</h4>
        </div>
      </section>
      <Button text="Learn to be data driven" to="/booking" class="large" />
    </section>
    
    <section class="service w-full">
      <img class="centered" src="/services/team.png" alt="Happy designer illustration">
      <section>
        <h2 class="center">Create your Product</h2>
        <h3 class="center">Hassle-free design for your app, website, or landing page</h3>
        <p class="center w-two-thirds">I provide top-tier user-experience, design, and front-end development services. With a solid Product-first process, and access to the right talent, your product will shine.</p>
      </section>

      <Button class="centered large" text="Start creating now" to="/booking" />
    </section>

  </section> -->
</template>

<style scoped lang="scss">

@import './assets/variables';

.invert {
  padding: $spacing-xxl 0;
  color: $black;
}

.general-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xl; 

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

#ProductFirstTitle {
  opacity: 0;
  animation: fadeInUp 0.3s forwards ease-in-out;
  animation-delay: 0.8s;

  h2 {
    font-size: 6vw;
    line-height: 1;
    margin-top: $spacing-lg;
    max-width: 1120px;
  }
}

#ProductFirstIntro {
  opacity: 0;
  animation: fadeInUp 0.3s forwards ease-in-out;
  animation-delay: 1.2s;
  display: flex;
  flex-direction: row;
  background: rgba($black, 0.05);
  border-radius: $br-lg;
  padding:0;
  min-height: 600px;
  margin-bottom: $spacing-xxl;

  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    padding: $spacing-lg;
    height: 100%;
    min-height: 600px;

    h3 {
      margin: 0;
      text-align: left;
    }

    p {
      margin: $spacing-md 0;
      text-align: left;
    }
  }

  .flow-diagram {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    margin: 0 auto;
    width: 50%;
    padding: $spacing-lg;
    min-height: 600px;
    background: rgba($black, 1);
    border-radius: 0 $br-lg $br-lg 0;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;   
    }

    .flow-diagram-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      img {
        width: 80px;
        height: 80px;
        margin-bottom: $spacing-xs;
      }

    }

    .arrow {
      width: 28px;
      height: 24px;
      fill: $teal-dark;

      @media screen and (max-width: 768px) {
        transform: rotate(90deg);
      }
    }
  }
}

#BuildTheRightThing {
  padding: $spacing-xl 0;

  h1 {
    margin-bottom: $spacing-xl;
  }

  .service {
    display:flex;
    flex-direction: row;
    gap: $spacing-md;
    background: rgba($black, 0.05);
    border-radius: $br-lg;

    img.steps {
      width: 100%;
    
      @media screen and (max-width: 768px) {
        width: 80%;
      }
    } 

    h2 {
      margin-top: 0;
      margin-bottom: $spacing-sm;
    }

    h3 {
      margin: 0 auto;
      text-align: center;
    }
  }

  .data-steps {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    width: 100%;
    margin-bottom: $spacing-md;

    .single-step {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      gap: $spacing-xs;
      padding: $spacing-sm $spacing-md;

      h4 {
        margin: 0;
      }

      svg {
        width: 36px;
        fill: none;
        stroke: $blue-dark;
        stroke-width: 5;
        stroke-linecap: round;
      }
    }
  }

  .create-a-product {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
    width: 100%;
    justify-content: space-between;
    margin-bottom: $spacing-md;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }

    div {
      h4 {
        color: $red-dark;
        margin: $spacing-sm 0;
        text-align: center;
      }
    }
  }

}

</style>