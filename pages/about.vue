<template>
  <main class="story-mode">
    <section class="content">
      <!-- <section class="left">
        <img class="portrait" src="/rami_big.png" alt="Rami James">
      </section> -->
      <section class="right">
        <img class="" src="/interface-images.jpg" alt="Interface work">
        <h4>Introduction</h4>
        <p>Rami James has been actively building online products since 1996. My roles within organizations have ranged from designer, product leader, developer, technical writer, head of developer relations, up to senior management.</p>
        <p>My preference is to work with small, fast-moving teams who build innovative and interesting functionality.</p>
        <p><strong>Interested in working together?</strong></p>
        <p>I'm always eager to learn about new teams and products.</p>
        <br>
        <p><a class="button" href="mailto:rami@ramijames.com">Start a conversation</a></p>
        <br>

        <h4>Work History</h4>
        <section class="jobs">
          <section class="single-job triangle">
            <p class="job-title">Consulting Specialist</p>
            <p class="job-duration">1996 - Present</p>
            <p class="job-descriptions">As a self-employed consultant, I have been providing my clientele with direct access to high-quality designs and implementations for decades.</p>
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
  </main>
</template>

<script>
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
  }
}

</script>

<style scoped>

.story-mode {
  margin:0 auto;
  display:flex;
  flex-direction: column;
  gap:4rem;
}

section.content {
  display:flex;
  flex-direction: row;
  gap:4rem;
  width: 100%;
}

section.left {
  width:35%;
}

section.right {
  width:65%;
  margin:0 auto
}

    section.right h4:first-of-type {
      margin-top: 0;
    }

    @media screen and (max-width: 768px) {
      section.content {
        flex-direction: column;
      }

      section.left {
        display: none;
      }

      section.right {
        width:100%;
      }
      
    }

.jobs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left:1px solid black;
  margin:2rem 0;
}

    .dark .jobs {
      border-left:1px solid white;
    }

    .single-job {
      margin: 0 0 2rem 2rem;
      position: relative;
    }

        .single-job:first-child {
          margin-top: 0;
        }

        .single-job::before {
          content: '';
          position: absolute;
          left: -37px;
          top:0rem;
          width: 7px;
          height: 7px;
          background-color: white;
          border:1px solid #190d28;
          border-radius: 50%;
        }

            .dark .single-job::before {
              background-color: #190d28;
              border:1px solid white;
            }

        .single-job.triangle::before {
          content: '';
          position: absolute;
          left: -41px;
          top:0rem;
          width: 0px;
          height: 0px;
          border-style: solid;
          border-width: 0 8px 10px 8px;
          border-color: transparent transparent #190d28 transparent;
          transform: rotate(0deg);
          border-radius: 0;
        }

            .dark .single-job.triangle::before {
              border-color: transparent transparent #FFFFFF transparent;
              background-color: #190d28;
            }

        .job-title {
          font-weight: bold;
          margin-top:-0.5rem;
          margin-bottom: 0.25rem;
          font-size:1.2rem;
        }

        .job-subtitle {
          font-size:0.8rem;
          font-weight: bold;
          margin-top:2rem;
          margin-bottom: 1rem;
          margin-left:2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.144);
          padding-bottom: .5rem;
          max-width: 480px;
        }

        .job-duration {
          font-size: 0.8rem;
          color: #666;
        }

        .job-descriptions,
        .job-descriptions li {
          font-size: 0.7rem;
          margin-left:2rem;
          max-width: 480px;
        }

        .job-descriptions li {
          margin:0 0 0.5rem 1rem;
        }

        .tiny-show-more {
          font-size: 0.6rem;
          color: #000000;
          cursor: pointer;
          text-decoration: none;
          padding:0.15rem .45rem;
          border:1px solid #0000001b;
          border-radius: 4px;
          margin-left:2rem;
        }

            .dark .tiny-show-more {
              color: #FFFFFF;
              border:1px solid #FFFFFF1b;
            }

        .tiny-show-more:hover {
          border:1px solid #000000FF;
        }

            .dark .tiny-show-more:hover {
              border:1px solid #FFFFFFFF;
            }



</style>