<template>
  <section class="w-three-quarters page-top">
    <h1 class="center">About</h1>
    <h4 class="center">My name is Rami James. I design products and implement front-ends in Vue and Nuxt. You can find me on <a href="https://twitter.com/ramijames">Twitter</a>, <a href="https://github.com/ramijames">Github</a>, and <a href="https://www.linkedin.com/in/rami-james/">LinkedIn</a>.</h4>
  </section>

  <!-- <section class="w-full">
    <img src="/interface-images.jpg" alt="Rami James"  class="single-product-image">
  </section> -->
  
  <section class="w-three-quarters">
    <section class="jobs">  
      <section class="single-job">
        <p class="job-title">Freelance</p>
        <p class="job-subtitle">Product Design and Front-end implementation</p>
        <p class="job-duration">Present</p>
        <p class="job-descriptions">Currently I provide a variety of product design and development services as a solo contractor. If you need those kinds of services, you can email me directly at <a href="mailto:ramijames@gmail.com">ramijames@gmail.com</a>.</p>
        <p class="job-descriptions">I have:</p>
        <ul class="job-descriptions">
          <li v-for="(description, index) in freelanceContractor" :key="index">
            {{ description }}
          </li>
        </ul>
      </section>
      <section class="single-job">
        <p class="job-title">Ultra</p>
        <p class="job-duration">2020 - 2023</p>
        <p class="job-subtitle">Head of Product for Developer Relations</p>
        <ul class="job-descriptions">
          <li v-for="(description, index) in ultraDevReldescriptions" :key="index">
            {{ description }}
          </li>
        </ul>

        <p class="job-subtitle">Technical Project Manager</p>
        <ul class="job-descriptions">
          <li v-for="(description, index) in ultraTechdescriptions" :key="index">
            {{ description }}
          </li>
        </ul>
      </section>
      <section class="single-job">
        <p class="job-title">Scatter</p>
        <p class="job-duration">2018 - 2020</p>
        <p class="job-subtitle">Co-founder and Head of Product</p>
        <ul class="job-descriptions">
          <li v-for="(description, index) in scatterProductdescriptions" :key="index">
            {{ description }}
          </li>
        </ul>
      </section>
      <section class="single-job">
        <p class="job-title">Qmarkets</p>
        <p class="job-duration">2015 - 2019</p>
        <p class="job-subtitle">Senior User Experience Designer and Developer</p>
        <ul class="job-descriptions">
          <li v-for="(description, index) in qmarketsdescription" :key="index">
            {{ description }}
          </li>
        </ul>
      </section>
    </section>
  </section>
  <PostsExtras />
  <Footer />
</template>

<script>
import Button from '/components/Button';

export default {
  data() {
    return {
      freelanceContractor :[
        'Worked with multiple teams to produce beautiful, usable, and accessible interfaces for web and mobile',
        'Provided key insights to small teams as they developed their product strategy, vision, user experiences, and designs',
        'Helped fine-tune product processes in companies as they experienced growing pains',
        'Implemented front-end interfaces in a variety of modern javascript frameworks like Vue and Nuxt'
      ],
      ultraDevReldescriptions: [
        'Grew the developer pool from zero to dozens of active developers',
        'Established Ultra’s documentation platform product website. Built its roadmap, wrote docs, and produced video tutorials ',
        'Successfully ran a Developer Hackathon with a $30K prize pool ',
        'Produced a successful tech-focused podcast with thousands of listeners'
      ],
      ultraTechdescriptions: [
        'Scaled (3 to 10 developers) and lead the technical team that launched Ultra’s gaming-focused networks',
        'Used an agile approach to solve production issues across multiple teams',
        'Produced roadmaps, product plans, and technical requirements using JIRA and Product Board'
      ],
      scatterProductdescriptions: [
        'Provided a clear vision for our startup while defining the product strategy and driving innovation',
        'Launched multiple versions of the popular Scatter wallet and scaled to 250K DAU',
        'Produced wireframes, prototypes, designs, marketing materials, websites, and documentation hubs for the community',
        'Directly interfaced with both developers and retail users to understand their needs'
      ],
      qmarketsdescription: [
        'Overhauled the user experience of an established enterprise product. Modernized the user experience to support mobile devices while making it easier to access, input, and manage key data and workflows',
        'Lead the update to the user experience and visual design of the core products of Qmarkets',
        'Worked closely with the R&D group where I facilitated the implementation of enterprise software used by tens of thousands of people across many large enterprises such as Lufthansa and Ford. Work was primarily in Drupal/PHP/CSS'
      ],
    }
  },
  components: {
    Button
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

.explanation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.split {
  width: 100%;
  margin-bottom: $spacing-lg;
}

.jobs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

    .single-job {
      margin: 0;
      position: relative;
      margin-bottom: $spacing-lg;
      display:flex;
      flex-direction: column;
      align-items: flex-start;
    }

        .job-title {
          font-family: $font-family-main;
          font-weight: 500;
          font-size: $font-size-xl;
          line-height: 120%;
        }

        .job-subtitle {
          font-weight:500;
          font-size: $font-size-lg;
        }

        .job-duration {
          font-size: $font-size-sm;
          border-radius: $br-sm;
          opacity: 0.3;
        }

        .job-descriptions {
          margin-top: 0;
          margin-bottom: $spacing-sm;
        }

        .job-descriptions li {
          margin-bottom: 0;
          font-size: $font-size-sm;
        }


</style>