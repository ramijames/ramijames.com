<template>
  <main id="About">

    <PageHeader title="About" tagline="Principal Product Designer" />

    <section class="about-container">

      <section class="who-am-i">
        <img src="/rami_small_white.png">
        <h3>My name is Rami James. I design products and implement front-ends in Vue and Nuxt. You can find me on <a href="https://github.com/ramijames">Github</a> and <a href="https://www.linkedin.com/in/rami-james/">LinkedIn</a>.</h3>
      </section>

      <section class="resume">
        <section class="jobs">  
          <section class="single-job">
            <p class="job-title">Rami James Design</p>
            <p class="job-duration">2005 - Present</p>
            <p class="job-subtitle">Contractor</p>
            <ul class="job-descriptions">
              <li v-for="(description, index) in contractor" :key="index">
                {{ description }}
              </li>
            </ul>
          </section>
          <section class="single-job">
            <p class="job-title">Vewrite</p>
            <p class="job-duration">2024 - 2025</p>
            <p class="job-subtitle">Founder</p>
            <ul class="job-descriptions">
              <li v-for="(description, index) in vewrite" :key="index">
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
    </section>
  </main>

  <Footer />
</template>

<script>
import Button from '/components/Button';

export default {
  data() {
    return {
      contractor :[
        'Worked with multiple teams to produce beautiful, usable, and accessible interfaces for web and mobile',
        'Provided key insights to small teams as they develop their product strategy, vision, user experiences, and designs',
        'Helped fine-tune product processes in companies as they experience growing pains',
        'Implemented front-end interfaces in a variety of modern frameworks'
      ],
      vewrite :[
        'Building a project management tool for developer relations, technical writing teams, and writers',
        'Designing and implementing the product',
        'Building a community of writers and project managers',
        'Writing documentation and tutorials for the product',
        'Building a marketing website for the product',
        'Team lead for a small team of developers, writers, and marketers'
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

#About {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 100rem;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba($blue, 0.05);

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  .who-am-i {
    padding: $spacing-xl;
    background: rgba($black, 0.05);
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    height: 100%;
    justify-content: flex-start;

    @media screen and (max-width: 1400px) {
      padding: $spacing-lg;
    }

    @media screen and (max-width: 1000px) {
      padding: $spacing-md;
    }

    @media screen and (max-width: 768px) {
      padding: $spacing-lg $spacing-sm;
    }
    
    img {
      max-width: 300px;
      border-radius: $br-sm;
    }
  }

  .resume {
    padding: $spacing-xl;
    background: rgba($blue, 0.05);
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    height: 100%;
    justify-content: space-between;

    @media screen and (max-width: 1400px) {
      padding: $spacing-lg;
    }

    @media screen and (max-width: 1000px) {
      padding: $spacing-md;
    }

    @media screen and (max-width: 768px) {
      padding: $spacing-lg $spacing-sm;
    }
  }

  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: $font-size-lg;
    }
  }

  h4 {
    color: rgba($white, 0.3);
    margin: 0;
  }

  hr {
    width: 100%;
    margin: $spacing-md 0;
  }

}

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
}

    .single-job {
      margin: 0;
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: $border;
      padding-bottom: $spacing-sm;
      margin-bottom: $spacing-md;
    }

        .job-title {
          font-family: $font-family-main;
          font-size: $font-size-xl;
        }

        .job-subtitle {
          font-size: $font-size-md;
        }

        .job-duration {
          font-size: $font-size-xs;
          border-radius: $br-sm;
          opacity: 0.3;
        }

        .job-descriptions {
          margin-top: 0;
          margin-bottom: $spacing-sm;
          font-size: $font-size-xs;
          line-height: 140%;
          opacity: 0.6;
        }

        .job-descriptions li {
          margin-bottom: $spacing-xs;
          font-size: $font-size-xs;
          line-height: 140%;
        }

#ServicesGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: $spacing-md;

  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;
  }

  .single-service {
    padding: $spacing-md;
    background: $white-dark;
    border-radius: $br-lg;

    @media screen and (max-width: 768px){
      border-right: none;
      margin-bottom: $spacing-md;
      width: calc(100vw - $spacing-md * 2);
    }

    svg {
      width: 60px;
    }

    h2 {
      margin: 0;
    }

    ul {
      list-style: none;
      margin: 0 0 $spacing-md;
      display: flex;
      flex-direction: row;
      gap: $spacing-md;

      @media screen and (max-width: 768px){
        flex-direction: column;
        gap: $spacing-xxs;
        margin-top: $spacing-sm;
      }

      li {
        margin: 0;
        padding: 0;
        line-height: 180%;
        font-size: $font-size-xs;
      }
    }

    p {
      margin-bottom: $spacing-lg;
    }
  }
}


</style>