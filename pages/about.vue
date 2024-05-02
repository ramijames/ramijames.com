<template>
  <main class="story-mode">
    <section class="content">
      <!-- <section class="left">
        <img class="portrait" src="/rami_big.png" alt="Rami James">
      </section> -->
      <section class="right">
        <h4>Introduction</h4>
        <p>I've been actively building online products since 1996. My roles within organizations have ranged from designer, product leader, developer, technical writer, head of developer relations, up to senior management.</p>
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
              <li>Established Ultra’s Developer Relations Product and built its roadmap</li>
              <li>Successfully ran a Developer Hackathon with a $30K prize pool which attracted new and engaged people to the community we were targeting</li>
              <li>Produced technical documentation which on-boarded new developers and supported existing ones</li>
              <li>Produced video tutorials that gave a detailed set of instructions for developers to follow</li>
              <li>Produced Ultra Chill, a successful tech-focused podcast which explained business use-cases, interviewed internal employees, external partners, and gave Ultra a platform to share their vision</li>
              <li>Managed developer outreach in coordination with the Business Development team</li>
              <li>Set up and streamlined Ultra’s technical support processes</li>
              <li>Led teams of developers to produce documentation, tutorials, code examples, and how-to videos</li>
            </ul>
          </section>
        </section>
      </section>
    </section>
  </main>
</template>

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
  border-left:2px solid black;
  margin:2rem 0;
}

    .single-job {
      margin: 0 0 0 2rem;
      position: relative;
    }

        .single-job:first-child {
          margin-top: 0;
        }

        .single-job::before {
          content: '';
          position: absolute;
          left: -39px;
          top:0rem;
          width: 8px;
          height: 8px;
          background-color: white;
          border:2px solid black;
          border-radius: 50%;
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
          border-color: transparent transparent #000000 transparent;
          transform: rotate(0deg);
          border-radius: 0;
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
          margin-bottom: 1rem;
        }

        .job-duration {
          font-size: 0.8rem;
          color: #666;
        }

        .job-descriptions,
        .job-descriptions li {
          font-size: 0.7rem;
        }

        .job-descriptions li {
          margin:0 0 0.5rem 1rem;
        }



</style>