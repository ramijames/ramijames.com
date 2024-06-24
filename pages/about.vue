<template>
  <section class="general-main page-top">
    <section class="explanation">
      <!-- <img src="/rami-profile.png" alt="Rami James" class="profile-pic"> -->
      <section class="jobs">
        <h2>My name is Rami James and I <span class="red">design products</span> and <span class="mint">implement front-ends</span> in Vue and Nuxt.</h2>
        <h2>You can find me on <a href="https://twitter.com/ramijames">Twitter</a>, <a href="https://github.com/ramijames">Github</a>, and <a href="https://www.linkedin.com/in/rami-james/">LinkedIn</a>.</h2>
      </section>
    </section>
  </section>
  <img src="/interface-images.jpg" alt="Rami James" class="split">
  <section class="general-main page-top">
    <section class="explanation">
      <section class="jobs">  
        <section class="single-job">
          <p class="job-title">Freelance</p>
          <p class="job-subtitle">Product Design and Front-end implementation</p>
          <p class="job-duration">Present</p>
          <p class="job-descriptions">I currently provide a variety of product design and development services as a solo contractor. If you need those kinds of services, you can email me directly at <a href="mailto:ramijames@gmail.com">ramijames@gmail.com</a>.</p>
        </section>
        <section class="single-job">
          <p class="job-title">Ultra</p>
          <p class="job-duration">2020 - 2023</p>
          <p class="job-subtitle">Head of Product for Developer Relations</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in ultraDevReldescriptions" :key="index" v-show="index < 3 || showMore[0]">
              {{ description }}
            </li>
          </ul>

          <p class="job-subtitle">Technical Project Manager</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in ultraTechdescriptions" :key="index" v-show="index < 3 || showMore[1]">
              {{ description }}
            </li>
          </ul>
        </section>
        <section class="single-job">
          <p class="job-title">Scatter</p>
          <p class="job-duration">2018 - 2020</p>
          <p class="job-subtitle">Co-founder and Head of Product</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in scatterProductdescriptions" :key="index" v-show="index < 3 || showMore[4]">
              {{ description }}
            </li>
          </ul>
        </section>
        <section class="single-job">
          <p class="job-title">Qmarkets</p>
          <p class="job-duration">2015 - 2019</p>
          <p class="job-subtitle">Senior User Experience Designer and Developer</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in qmarketsdescription" :key="index" v-show="index < 3 || showMore[5]">
              {{ description }}
            </li>
          </ul>
        </section>
      </section>
    </section>
  </section>
  <Footer />
</template>

<script>
import Button from '/components/Button';

export default {
  data() {
    return {
      showMore: [ true, // Ultra Developer Relations
                  true, // Ultra Technical
                  true, // Scatter Product
                  true, // Qmarkets
                ],
      ultraDevReldescriptions: [
        'Product Lead to on-board, support, and inspire developers',
        'Established Ultra’s documentation platform Product and built its roadmap, wrote docs, and produced video tutorials',
        'Successfully ran a Developer Hackathon with a $30K prize pool',
        'Produced Ultra Chill, a successful tech-focused podcast'
      ],
      ultraTechdescriptions: [
        'Oversaw the development of highly technical products, while managing team expansions and project roadmaps',
        'Lead the team which launched the Ultra networks',
        'Used an agile approach to solve production issues within a team of 10 developers',
        'Produced roadmaps, product plans, and technical requirements using JIRA and Product Board'
      ],
      scatterProductdescriptions: [
        'Provided a clear vision for our startup while defining the product strategy and driving innovation',
        'Launched multiple versions of the popular Scatter wallet',
        'Produced wireframes, prototypes, designs, marketing materials, websites, and documentation hubs for the community',
        'Directly interfaced with both developers and retail users to understand their needs'
      ],
      qmarketsdescription: [
        'Overhauled the user experience of an established enterprise product. Modernized the user experience to support mobile devices while making it easier to access, input, and manage key data and workflows',
        'Lead the update to the user experience and visual design of the core products of Qmarkets',
        'Worked closely with the R&D group where I facilitated the implementation of enterprise software used by tens of thousands of people across many large companies. Work was primarily in Drupal/PHP/CSS'
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

        .tiny-show-more {
          color: $black;
          cursor: pointer;
          text-decoration: none;
          padding: $spacing-xs $spacing-sm;
          background-color: rgba($black, 0.1);
          margin-top: $spacing-md;
          font-size: $font-size-xs;
          color: $black;
          font-weight: 600;
          text-transform: uppercase;
        }

        .tiny-show-more:hover {
          background-color: rgba($black, 0.2);
        }


</style>