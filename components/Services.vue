<template>
  <Separator />
  <section id="services" class="general-main">
    <section id="proven">
      <SectionTitle title="A better way of working" 
                    subtitle="Replace unreliable freelancers and expensive design agencies with 
                              a flat-fee subscription to an experienced product designer so that you can focus on making your business grow." />
      <Button text="See available plans" size="default" to="#get-to-work" />
    </section>
    <section id="proven-steps">
      <div class="step">
        <img src="/services/add.png" alt="Subscribe and request as many designs as you need.">
        <p>Add as many designs as you need to the queue.</p>
      </div>
      <div class="step">
        <img src="/services/calendar.png" alt="Subscribe and request as many designs as you need.">
        <p>The average turnaround for a design is two days.</p>
      </div>
      <div class="step">
        <img src="/services/iterate.png" alt="Subscribe and request as many designs as you need.">
        <p>We keep iterating until you are satisfied.</p>
      </div>
      <div class="step">
        <img src="/services/ok.png" alt="Subscribe and request as many designs as you need.">
        <p>Keep on working! Let's build something great.</p>
      </div>
    </section>
  </section>
  <section id="member-perks" class="general-main">
    <h2>Membership perks</h2>
    <section id="perks">
      <div class="perk">
        <img src="/services/success.png" alt="Subscribe and request as many designs as you need.">
        <h5>No waiting. No meetings. Just get things done.</h5>
        <p>Asynchronous work means that you don’t lose time waiting for a matching hole in our busy schedules.</p>
      </div>
      <div class="perk">
        <img src="/services/trello.png" alt="Subscribe and request as many designs as you need.">
        <h5>Easy project management with Trello.</h5>
        <p>No complex project management. Simply create a task in Trello, and watch it fly through the process queue.</p>
      </div>
      <div class="perk">
        <img src="/services/team.png" alt="Subscribe and request as many designs as you need.">
        <h5>Everybody is welcome to join your subscription.</h5>
        <p>Each subscription is company-wide, which means that anyone in your organization who needs help gets it.</p>
      </div>
      <div class="perk">
        <img src="/services/budget.png" alt="Subscribe and request as many designs as you need.">
        <h5>Fixed-rate means you can budget accordingly.</h5>
        <p>It's impossible to run a successful business if you don't know the costs ahead of time. Let's make sure you do.</p>
      </div>
      <div class="perk">
        <img src="/services/fast.png" alt="Subscribe and request as many designs as you need.">
        <h5>Super-fast delivery so you can hit impossible targets</h5>
        <p>You’ve never worked with a designer who gets it done so fast. You won’t believe it.</p>
      </div>
      <div class="perk">
        <img src="/services/ai.png" alt="Subscribe and request as many designs as you need.">
        <h5>Always unique design, never AI-generated</h5>
        <p>Every design task is a custom piece of work that is never shared with other clients. We take pride in what we do for you.</p>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

#services {
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px){
    flex-direction: column;
  }

  #proven {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 50%;
    padding-right: $spacing-lg;

    @media screen and (max-width: 768px){
      width: 100%;
      height: auto;
      position: relative;
      padding-right: 0;
      padding-bottom: $spacing-lg;
      align-items: center;
    }
  
  }

  #proven-steps {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    .step {
      display: flex;
      flex-direction: row;
      gap: $spacing-md;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }

      p {
        margin: 0;
        font-size: $font-size-lg;

        @media screen and (max-width: 1000px) {
          font-size: $font-size-md;
          line-height: $font-size-md * $multiplier;
        }
      }
    }
  }

}

.dark #services {

  .service-explainer {

    .together {
      color: $blue;
    }
  }
}

#member-perks {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top:0;

  #perks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: $spacing-xl;

    @media screen and (max-width: 1000px){
      grid-template-columns: 1fr 1fr;
      gap: $spacing-md;
    }

    .perk {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-sm;

      img {
        width: 75%;
        max-width: 200px;
        height: auto;
      }

      h5 {
        font-size: $font-size-md;
        line-height: $font-size-md * $multiplier;
        font-weight: bold;
        text-align: center;
        margin:0;
      }

      p {
        font-size: $font-size-sm;
        text-align: center;
        line-height: $font-size-sm * $multiplier;
      }
    }
  }
}


</style>