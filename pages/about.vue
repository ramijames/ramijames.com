<template>
  <section class="general-main page-top">
    <section class="explanation">
      <img src="/rami-profile.png" alt="Rami James" class="profile-pic">
      
      <section class="jobs">
        <h4>My name is Rami James and I have been actively building online products since 1996. 
                    My roles within organizations have ranged from designer, product leader, developer, 
                    technical writer, head of developer relations, and in recent years up to senior management as COO and Co-founder.</h4>
        <br><br>
        <section class="single-job">
          <p class="job-title">Consulting Specialist</p>
          <p class="job-duration">1996 - Present</p>
          <p class="job-descriptions">I currently teach small, fast-moving teams <nuxt-link to="/">how to be Product-first</nuxt-link> so that they can build innovative and interesting software while taking their market niche by storm.</p>
          <p><Button text="Get in touch" to="https://calendly.com/itsramijames" /></p>
          <p>Or email me directly at <a href="mailto:rami@ramijames.com">rami@ramijames.com</a>.</p>
        </section>
        <section class="single-job">
          <p class="job-title">Ultra</p>
          <p class="job-duration">2020 - 2023</p>
          <p class="job-subtitle">Head of Developer Relations and Strategy</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in ultraDevReldescriptions" :key="index" v-show="index < 3 || showMore[0]">
              {{ description }}
            </li>
          </ul>
          <p><a class="tiny-show-more" href="#" @click.prevent="showMore[0] = !showMore[0]">{{ showMore[0] ? 'Hide' : 'Show more' }}</a></p>
          <p class="job-subtitle">Technical Project Manager</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in ultraTechdescriptions" :key="index" v-show="index < 3 || showMore[1]">
              {{ description }}
            </li>
          </ul>
          <p><a class="tiny-show-more" href="#" @click.prevent="showMore[1] = !showMore[1]">{{ showMore[1] ? 'Hide' : 'Show more' }}</a></p>
        </section>
        <section class="single-job">
          <p class="job-title">FIO</p>
          <p class="job-duration">2020 - 2021</p>
          <p class="job-subtitle">Board Member</p>
          <ul class="job-descriptions">
            <li>As a board member I helped make tough decisions to define strategy for FIO as they tried to expand the reach of their technology</li>
          </ul>
        </section>
        <section class="single-job">
          <p class="job-title">Scatter</p>
          <p class="job-duration">2018 - 2020</p>
          <p class="job-subtitle">COO</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in scatterCoodescription" :key="index" v-show="index < 3 || showMore[3]">
              {{ description }}
            </li>
          </ul>
          <p><a class="tiny-show-more" href="#" @click.prevent="showMore[3] = !showMore[3]">{{ showMore[3] ? 'Hide' : 'Show more' }}</a></p>
          <p class="job-subtitle">Head of Product</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in scatterProductdescriptions" :key="index" v-show="index < 3 || showMore[4]">
              {{ description }}
            </li>
          </ul>
          <p><a class="tiny-show-more" href="#" @click.prevent="showMore[4] = !showMore[4]">{{ showMore[4] ? 'Hide' : 'Show more' }}</a></p>
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
          <p><a class="tiny-show-more" href="#" @click.prevent="showMore[5] = !showMore[5]">{{ showMore[5] ? 'Hide' : 'Show more' }}</a></p>  
        </section>
        <section class="single-job">
          <p class="job-title">Inkod-Hypera</p>
          <p class="job-duration">2005 - 2007</p>
          <p class="job-subtitle">Designer</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in inkodHyperadescription" :key="index" v-show="index < 3 || showMore[6]">
              {{ description }}
            </li>
          </ul>
        </section>
        <section class="single-job">
          <p class="job-title">Spiral Solutions</p>
          <p class="job-duration">2001 - 2005</p>
          <p class="job-subtitle">Designer</p>
          <ul class="job-descriptions">
            <li v-for="(description, index) in spiralSolutionsDescription" :key="index" v-show="index < 3 || showMore[7]">
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
      showMore: [ false, // Ultra Developer Relations
                  false, // Ultra Technical
                  false, // Scatter Product
                  false, // Scatter COO
                  false, // Qmarkets
                  false, // Inkod
                  false  // Spiral Solutions
                ],
      ultraDevReldescriptions: [
        'Established the Developer Relations Product and built its roadmap',
        'Successfully ran a Developer Hackathon with a $30K prize pool which attracted new and engaged people to the community we were targeting',
        'Produced technical documentation which on-boarded new developers and supported existing ones',
        'Produced video tutorials that gave a detailed set of instructions for developers to follow',
        'Produced Ultra Chill, a successful tech-focused podcast which explained business use-cases, interviewed internal employees, external partners, and gave Ultra a platform to share their vision',
        'Managed developer outreach in coordination with the Business Development team',
        'Set up and streamlined Ultras technical support processes',
        'Led teams of developers to produce documentation, tutorials, code examples, and how-to videos'
      ],
      ultraTechdescriptions: [
        'Oversaw highly technical projects within a blockchain development environment, while managing team expansions and project roadmaps',
        'Launched to the public the gaming-focused L1 blockchain Testnet and Mainnet',
        'Oversaw the on-boarding of new developers and the expansion of the development team',
        'Produced roadmaps, product plans, and technical requirements using JIRA and Product Board',
        'Defined expectations for and acted as a liaison among the retail and developer community, company heads, middle management, and executive stakeholders'
      ],
      scatterProductdescriptions: [
        'Provided a clear vision for our product while defining the product strategy, drove innovation, and ensured that the products aligned with market needs and business goals.',
        'Launched multiple versions of the popular Scatter wallet',
        'Engaged directly with the retail and developer communities to understand their needs',
        'Produced wireframes, prototypes, and final designs',
        'Produced marketing materials, websites, and documentation hubs for the community'
      ],
      scatterCoodescription: [
        'Oversaw the day-to-day operations of the company. Focused on improving efficiency, implementing processes, and ensuring that our resources were effectively utilized to achieve our goals.',
        'Set up operations allowing Scatter to run as a legal business entity in Malta',
        'Managed legal teams in navigating the uncertainty of the crypto market',
        'Built decks for use in fundraising efforts',
        'Initiated relations and negotiated with multiple interested VCs',
        'Produced due diligence documentation for potential investors'
      ],
      qmarketsdescription: [
        'Overhauled the user experience of an established enterprise product. Modernized the user experience to support mobile devices while making it easier to access, input, and manage key data and workflows',
        'Lead the update to the user experience and visual design of the core products of Qmarkets',
        'Worked closely with the R&D group where I facilitated the implementation of enterprise software used by tens of thousands of people across many large companies',
        'Created innovative new ways to view and interact with complex enterprise processes'
      ],
      inkodHyperadescription: [
        'I worked as a designer under the tutelage of the highly experience Ilan Dray.',
        'During my tenure, created a variety of designs such as interfaces, websites, games, and illustrative works.'
      ],
      spiralSolutionsDescription: [
        'I helped design and deploy materials that supported marketing efforts for a large, established igaming group',
        'We produced websites, banners, newsletters, mailers, print materials, and other supporting goods',
        'During the tail end of my tenure, I was the lead designer and guided strategy while art directing the junior designers.'
      ]
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

.profile-pic {
  margin: 0 auto;
  border-radius: $br-lg;
  align-self: flex-end;
  width: 200px;
  margin-bottom: -$spacing-lg;
  z-index: 1;
}


.jobs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: url("/_nuxt/public/textures/texture-3-bg.png") padding-box, linear-gradient(140deg, white -5%, white 15%) border-box;
  border-radius: $br-lg;
  border: 4px solid transparent;
  padding: $spacing-xl $spacing-lg $spacing-lg $spacing-lg;

  @media screen and (max-width: 768px){
    padding: $spacing-xl $spacing-md $spacing-md $spacing-md;
    
  }
}

    .dark .jobs {
      background: url("/_nuxt/public/textures/texture-3-bg-dark.png") padding-box, linear-gradient(140deg, $black-light -5%, $black-light 15%) border-box;
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
          font-family: $font-family-main, sans-serif;
          color: $teal-dark;
          font-weight: 700;
          font-size: $font-size-xl;
        }

        .job-subtitle {
          font-weight: bold;
          margin-top: $spacing-md;
          margin-bottom: 0;
        }

        .job-duration {
          font-size: $font-size-sm;
          color: $teal;
          border-radius: $br-sm;
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
          border-radius: $br-sm;
          background-color: rgba($blue, 0.1);
          margin-top: $spacing-md;
          font-size: $font-size-sm;
          color: $teal;
        }

        .tiny-show-more:hover {
          background-color: rgba($blue, 0.2);
        }


</style>