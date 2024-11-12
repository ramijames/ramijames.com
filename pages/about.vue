<template>
  <main id="About">
    <!-- <div class="mask">
      <div id="mesh-gradient" class="sixteen-elements">
        <div class="element" v-for="n in 160" :key="n"></div>
      </div>
    </div> -->
    <section class="about-hero">
      <section class="intro-text w-content">
        <p class="small blue">
          Who is this guy?
        </p>
        <p>
          <span>A</span>
          <span>b</span>
          <span>o</span>
          <span>u</span>
          <span>t</span>
        </p>
        <section class="about-buttons">
          <a class="button large" href="mailto:ramijames@gmail.com">Say hello!</a>
        </section>
      </section>
    </section>

    <section class="w-content">
      <h2 class="hello-text">Quick Intro</h2>
      <p class="hello-text">My name is Rami James. I design products and implement front-ends in Vue and Nuxt. You can find me on <a href="https://twitter.com/ramijames">Twitter</a>, <a href="https://github.com/ramijames">Github</a>, and <a href="https://www.linkedin.com/in/rami-james/">LinkedIn</a>. I'm always building something. These days I'm focused on building <a href="https://vewrite.com/">Vewrite</a>, a project management tool for developer relations, technical writing teams, and writers.</p>
    </section>

    <section class="w-content">
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
  </main>
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
    transform: skewY(0deg) scale(0.6);
    animation: skewIn .9s forwards ease-in-out;

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
    text-transform: uppercase;
    font-weight: 900;
    animation: shadowDrop 0.5s forwards ease-in-out;
    animation-delay: 0.4s;

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
      animation: shadowDropMobile 0.5s forwards ease-in-out;
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
          font-weight: 500;
          font-size: $font-size-xxl;
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


.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: -1;
  mask-image: linear-gradient( rgba(0,0,0,0) 5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%);
}

#mesh-gradient.sixteen-elements {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  z-index: -10;
  align-items: center;
  justify-content: center;;
  opacity: 1;
  position: fixed;
  pointer-events: none;
  top:0;
  left:0;
  right:0;
  animation: rotateGroup 80s linear infinite;

  @media screen and (max-width: 768px){
    display: none;
  }

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 360 {
    $hue: ($i - 1) * calc(360 / 220);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      // background: linear-gradient(to bottom, rgba($color,0) 55%, rgba($color,.8));
      border: 1px solid rgba($color, .4);
      animation-delay: -#{$i * .45}s;
      width: 40dvw;
      height: .05dvw;
      border-radius: 1rem;
      align-self: center;
      justify-self: center;
    }
  }

  .element {
    animation: sixteen-elements 30s linear infinite;
  }

  @keyframes rotateGroup {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
}

</style>