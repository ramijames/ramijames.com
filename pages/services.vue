<template>
  <section class="general-main page-top services-gap">
    <h2 class="center">Services</h2>
    <h3 class="grey center">I provide a variety of product design and development services as a solo contractor. If you need those kinds of services, you can <a href="mailto:ramijames@gmail.com">email me directly</a>.</h3>

    <section id="QuickServices">
      <section id="ServicesGrid">
        <section class="single-service">
          <h4>Product</h4>
          <ul>
            <li>Product Vision</li>
            <li>Product First Management</li>
            <li>Product Roadmapping</li>
          </ul>
        </section>
        <section class="single-service">
          <h4>Design</h4>
          <ul>
            <li>Wireframing</li>
            <li>Prototyping</li>
            <li>Mockups</li>
            <li>Illustrations and Icons</li>
          </ul>
        </section>
        <section class="single-service">
          <h4>Development</h4>
          <ul>
            <li>Front-end Development</li>
            <li>Vue/Nuxt</li>
            <li>Accessibility</li>
            <li>Web3</li>
          </ul>
        </section>
      </section>
    </section>

    <section id="Rate">
      <h2 class="center">Rate and availability</h2>
      <h3 class="grey center">My current hourly rate is $65, and I book up to 160 hours of work monthly.</h3>
      <Button text="Add your project" size="default" to="/booking" />
    </section>

    <section id="Services">
      <section class="service">
        <img src="/services/iterate.png" alt="Iteration is key" />
        <h4>Design</h4>
        <p>From user experience wireframes and prototypes to high-fidelity mockups, I excel at making simple looking, highly usable interfaces that stand out in our shared competitive market.</p>
      </section>
      
      <section class="service">
        <img src="/services/success.png" alt="Product First Management" />
        <h4>Product</h4>
        <p>Ensuring that you are building the right things for the right reasons can be a monumental task. I have decades of experience helping teams make smart decisions about their product, ensuring that it matches both business and user needs. I'd love to help you, too.</p>
      </section>
      <section class="service">
        <img src="/services/bulb.png" alt="Lightbulb" />
        <h4>Front-end Development</h4>
        <p>Need a website or web app built? I can help you build using modern technologies so that your business is secure, fast, accessible, and responsive.</p>
      </section>
      <section class="service">
        <img src="/services/team.png" alt="Product First Management" />
        <h4>Product First Management</h4>
        <p>Need help managing your product? I can help you with that too.</p>
      </section>
      
    </section>
  </section>
  
  <Footer />
</template>

<script>
import Button from '/components/Button';


</script>

<style scoped lang="scss">

@import './assets/variables';

.services-gap {
  gap: 0;
}

#Services {
  display: grid;
  gap: $spacing-lg;
  grid-template-columns: 1fr 1fr;
  margin-top: $spacing-xl;

  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;
  }

  .service {
    text-align: center;
  }
}

#Rate {
  margin-top: $spacing-xl;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
}

#QuickServices {
  border: 1px solid $gray;
  margin-top: $spacing-md;

  #ServicesGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 768px){
      grid-template-columns: 1fr;
    }

    .single-service {
      padding: $spacing-md;
      border-right: 1px solid $gray;

      @media screen and (max-width: 768px){
        border-right: none;
        border-bottom: 1px solid $gray;
      }

      &:last-child {
        border: none;
      }

      h4 {
        margin-top: 0;
        margin-bottom: $spacing-xs;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}

.dark #QuickServices {
  border: 1px solid rgba(241, 240, 251, 0.2);

  #ServicesGrid {
    .single-service {
      border-right: 1px solid rgba(241, 240, 251, 0.2);

      @media screen and (max-width: 768px){
        border-right: none;
        border-bottom: 1px solid rgba(241, 240, 251, 0.2);
      }

      &:last-child {
        border: none;
      }
    }
  }
}

</style>