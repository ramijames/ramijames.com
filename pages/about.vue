<template>
  <main id="About">
    <section class="about-hero">
      <section class="intro-text w-content">
        <p>
          <span>A</span>
          <span>b</span>
          <span>o</span>
          <span>u</span>
          <span>t</span>
        </p>
        <section class="about-buttons">
          <a class="button large primary" href="mailto:ramijames@gmail.com">Say hello!</a>
        </section>
      </section>
    </section>

    <section class="w-half">
      <p class="center">My name is Rami James. I design products and implement front-ends in Vue and Nuxt. You can find me on <a href="https://twitter.com/ramijames">Twitter</a>, <a href="https://github.com/ramijames">Github</a>, and <a href="https://www.linkedin.com/in/rami-james/">LinkedIn</a>. I'm always building something. These days I'm focused on building <a href="https://vewrite.com/">Vewrite</a>, a project management tool for developer relations, technical writing teams, and writers.</p>
    </section>

    <section class="w-content">
      <h2>Experience</h2>
      <section class="jobs">  
        <section class="single-job">
          <p class="job-title">Vewrite</p>
          <p class="job-subtitle">Founder</p>
          <p class="job-duration">2024 - Present</p>
          <p class="job-descriptions">Currently I'm the founder, product and development lead at Vewrite.</p>
          <p class="job-descriptions">My day to day includes</p>
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
  </main>
  <PostsExtras />
  <Footer />
</template>

<script>
import Button from '/components/Button';

export default {
  data() {
    return {
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

.about-hero {
  padding: $spacing-lg 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .intro-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    // transform: skewY(0deg) scale(0.6);
    // animation: skewIn .9s forwards ease-in-out;

    .about-buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0;
      margin-top: $spacing-md;
      animation: fadeInUp 0.5s forwards ease-in-out;
      opacity: 0;
      animation-delay: .65s;

      .arrow-down {
        margin-top: $spacing-md;
        animation: bounce 2s infinite ease-in-out;
      }
      
      .button {
        margin-top: -2px;
      }

      @media screen and (max-width: 600px){
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;

        .button {
          width: 100%;
        }
      }
    }
  }

  p {
    font-size: 4vw;
    line-height: 100%;
    letter-spacing: -0.1rem;
    text-wrap: balance;
    font-family: $font-family-main;
    margin-bottom: $spacing-md;
    color: $black;

    &.small {
      font-size: $font-size-md;
      letter-spacing: 0.1rem;
      font-weight: 500;
      animation: fadeInUp 0.5s forwards ease-in-out;
      animation-delay: .65s;
      opacity: 0;
      margin-bottom: $spacing-sm;
    }

    span {
      display: inline-block;
      animation: zoomBack 0.5s forwards ease-in-out;
      opacity: 0;
      transition: all 0.35s ease-in-out;

      // There are 8 letters, so let's iterate through them and delay each one
      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.025s;
        }
      }
    }

    @media screen and (max-width: 768px){
      font-size: 11vw;
      text-wrap: balance;
    }
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