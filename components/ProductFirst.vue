<template>
  <section id="ProductFirstIntro" class="general-main">
    <section class="w-full">
      <h1 class="center">What does it mean to be <span class="highlight">Product-first?</span></h1>
    </section>
    <section class="w-two-thirds">
      <h4 class="center">Being Product-first means that you have a Product team and it is <span class="highlight">a first-class player and decision maker</span> within your organization.</h4>
    </section>

    <section class="w-two-thirds">
      <h2 class="center">Product-first is a Process your team can adopt</h2>
      <p class="center">To get there, you need a clear vision of what you are building, why you are building it, a roadmap for how you want to get there, and a clear process that keeps you out of trouble.</p>
    </section>
    <section class="w-full flow-diagram">

      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/add.png" alt="Product team illustration" />
        <h5>Comprehensive Product Vision</h5>
      </div>

      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/calendar.png" alt="Product team illustration" />
        <h5>Thoughtful Roadmap Building</h5>
      </div>

      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/ok.png" alt="Product team illustration" />
        <h5>User-focused Feature Definition</h5>
      </div>

      <div class="flow-diagram-item">
        <img class="product-team center" src="/services/iterate.png" alt="Product team illustration" />
        <h5>Excellent Design & Development</h5>
      </div>

    </section>
  </section>
  <section id="BuildTheRightThing" class="general-main">

    <section class="w-full">
      <p class="super-text">Early-stage startups, small teams, and solopreneurs need help with this stuff</p>
      <h1 class="center">It's the answer to: <span class="highlight">"Are we building the right thing?"</span></h1>
    </section>
    
    <section class="service w-full">
      <img src="/services/success.png" alt="Subscribe and request as many designs as you need.">
      <p class="super-text">Service</p>
      <section>
        <h2 class="center">Define your Product Vision</h2>
        <h3 class="center w-two-thirds">Can you tell me in 10 words or less what you are building?</h3>
      </section>
      <p class="center w-two-thirds">Your Product Vision is a foundational component of how you define features, market your product, and build your user base. I’ve developed a unique three part process that will help you hone in on your perfect Product Vision.</p>
      <Button text="Let's define your Product Vision" to="/booking" />
    </section>
    <Separator />
    <section class="service w-two-thirds">
      <img src="/services/budget.png" alt="Calculator illustration">
      <p class="super-text">Service</p>
      <section>
        <h2 class="center">Be Data-driven</h2>
        <h3 class="center">How are you validating that your users need what you are building?</h3>
      </section>
      <p class="center">You should have a process in place that allows you to get insights from your users, convert that into a product roadmap, and validate with data. I have developed a framework for how this should be done, and can help your team implement it quickly.</p>
      <section class="data-steps">
        <div class="single-step">
          <h4>Build your product roadmap</h4>
          <svg width="53" height="39" viewBox="0 0 53 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 22L16.2929 35.2929C16.6834 35.6834 17.3166 35.6834 17.7071 35.2929L50 3" stroke="#7D4793" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="single-step">
          <h4>Set up an insights channel</h4>
          <svg width="53" height="39" viewBox="0 0 53 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 22L16.2929 35.2929C16.6834 35.6834 17.3166 35.6834 17.7071 35.2929L50 3" stroke="#7D4793" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="single-step">
          <h4>Set up your validation methodology</h4>
          <svg width="53" height="39" viewBox="0 0 53 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 22L16.2929 35.2929C16.6834 35.6834 17.3166 35.6834 17.7071 35.2929L50 3" stroke="#7D4793" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
      </section>
      <Button text="Learn to be data driven" to="/booking" />
    </section>
    <Separator />
    <section class="service w-full">
      <img src="/services/team.png" alt="Happy designer illustration">
      <p class="super-text w-two-thirds">Service</p>
      <section>
        <h2 class="center">Create your Product</h2>
        <h3 class="center w-two-thirds">Don’t you want to get a hassle-free design for your app, website, or landing page?</h3>
      </section>
      <p class="center w-half">I also provide top-tier user-experience, design, and front-end development services. With a solid Product-first process, and access to the right talent, your product will shine.</p>
      <!-- <section class="create-a-product">
        <div>
          <img src="/services/bulb.png" alt="Bright ideas">
          <h4>Fresh concepts</h4>
        </div>
        <div>
          <img src="/services/iterate.png" alt="Iterate">
          <h4>Iterative Approach</h4>
        </div>
        <div>
          <img src="/services/calendar.png" alt="Always on-time">
          <h4>Always On-time</h4>
        </div>
      </section> -->
      <Button text="Start creating now" to="/booking" />
    </section>

  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

#ProductFirstIntro {

  img.product-team {
    width: 100%;
    margin-bottom: $spacing-md;
  } 

  .flow-diagram {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    margin: 0 auto;
    gap: $spacing-md;

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
        width: 100px;
        height: 100px;
        margin-bottom: $spacing-xs;
      }

      h5 {
        color: $teal-dark;
        font-weight: 600;
        font-size: $font-size-md;
        text-align: center;
        margin:0;
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
    flex-direction: column;
    gap: $spacing-md;

    img.steps {
      width: 100%;
    
      @media screen and (max-width: 768px) {
        width: 80%;
      }
    } 

    h2 {
      color: $red-dark;
      margin-top: 0;
      margin-bottom: $spacing-sm;
    }

    h3 {
      color: $red-dark;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .data-steps {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    width: 100%;

    .single-step {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      gap: $spacing-xs;
      border: 1px solid $red;
      border-radius: $br-md;
      padding: $spacing-sm $spacing-md;

      h4 {
        color: $red-dark;
        font-weight: 600;
        margin: 0;
      }

      svg {
        width: 36px;
        fill: none;
        stroke: $red-dark;
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
        font-weight: 600;
        margin: $spacing-sm 0;
        text-align: center;
      }
    }
  }

}

</style>