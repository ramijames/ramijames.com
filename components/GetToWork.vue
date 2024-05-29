<template>
  <a name="join"></a>
  <Separator />
  <section id="get-to-work-intro" class="general-main">
    <h2>Join today</h2>
    <h5>I'm excited for us to work together, build great products, and release them to the world.</h5>
  </section>
  <section id="get-to-work" class="general-main">
    <div class="plans">
      <div class="single-plan">
        <div class="plan-type">Standard</div>
        <div class="plan-price">$3,995<span class="per-month">/month</span></div>

        <div class="plan-includes">What’s included?</div>
        <div class="includes-list">
          <div class="include-item">One active request</div>
          <div class="include-item">Unlimited queued items</div>
          <div class="include-item">Unlimited stock photos</div>
          <div class="include-item">Unlimited users</div>
          <div class="include-item">Unlimited projects</div>
          <div class="include-item">Average 48h delivery</div>
        </div>

        <div class="select-row">
          <Button text="Buy Standard" size="default" to="/contact" />
          <div class="just-in-case">Cancel or pause your subscription anytime</div>
        </div>
      </div>

      <div class="single-plan growth">
        <div class="plan-type">Growth</div>
        <div class="plan-price">$6,295<span class="per-month">/month</span></div>

        <div class="plan-includes">What’s included?</div>
        <div class="includes-list">
          <div class="include-item">Multiple active requests</div>
          <div class="include-item">Vuejs development</div>
          <div class="include-item">Unlimited stock photos</div>
          <div class="include-item">Unlimited users</div>
          <div class="include-item">Unlimited projects</div>
          <div class="include-item">Average 48h delivery</div>
        </div>

        <div class="select-row">
          <Button text="Buy Growth" size="default" to="/contact" />
          <div class="just-in-case">Cancel or pause your subscription anytime</div>
        </div>
      </div>
    </div>
    <section id="post-work-question">
      <h3>Not sure exactly what you need?</h3>
      <h5><a href="#booking">Book a quick call</a> and I’ll run you through the process and its benefits.</h5>
    </section>
  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

#get-to-work-intro,
#post-work-question {

  padding-bottom: 0;
  gap:0;

  h2 {
    text-align: center;
    margin-top: 0;
  }

  h5 {
    margin-top: 0;
    text-align: center;
    margin-bottom: $spacing-lg;
  }
}

#post-work-question {
  h3 {
    text-align: center;
    margin-top: $spacing-md;
  }
}

#get-to-work {
  padding-top: 0;
  
  .plans {
    display:flex;
    flex-direction: row;
    gap: $spacing-md;

    @media screen and (max-width: 1000px){
      flex-direction: column;
    }

    .single-plan {
      display:flex;
      flex-direction: column;
      gap: $spacing-md;
      padding: $spacing-md;
      background-color: $white-dark;
      border-radius: $br-lg;

      &.growth {

        background: $blue-light;

        .plan-type {
          color: $white;
        }

        .plan-price {
          color: $white;
        }

        .plan-includes {
          color: $white;
        }

        .includes-list {
          .include-item {
            color: $white;

            &::before {
              background: $blue;
            }
          }
        }

        .select-row {
          border-top: 1px solid rgba($blue, 0.2);
        }

        .include-item {
          &::before {
            background: $blue;
          }
        }
      }

      .plan-price {
        font-size: $font-size-max;
        font-weight: 700;

        .per-month {
          font-size: $font-size-md;
          font-weight: 400;
        }
      }

      .plan-type {
        font-size: $font-size-lg;
        font-weight: 700;
      }

      .plan-includes {
        $font-weight: 700;
      }

      .includes-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: $spacing-sm;

        @media screen and (max-width: 768px){
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        }

        .include-item {
          &::before {
            background: $black;
          }
        }
      }

      .include-item {
        font-size: $font-size-sm;
        position: relative;
        padding-left: $spacing-sm;

        &::before {
          content: '';
          position: absolute;
          top:4px;
          left: 0;
          width:6px;
          height: 6px;
          border-radius: 50%;
          background: $black;
        }
      }

      .select-row {
        display: flex;
        flex-direction: row;
        gap: $spacing-sm;
        align-items: center;
        justify-content: flex-start;
        font-size: $font-size-sm;
        border-top: 1px solid rgba($black, 0.2);
        padding: $spacing-md 0;

        @media screen and (max-width: 1000px){
          flex-direction: column;
        }

        .just-in-case {
          font-size: $font-size-xs;
          color: rgba($black, 0.5);
        }
      }
    }
  }
}

.dark #get-to-work {
  .single-plan {
    background-color: $black-light;

    &.growth {
      background: $blue-dark;

      .plan-price {
        color: $white;
        text-shadow: 0 0 4px rgba($blue,1), 0 0 50px rgba($blue,1);
      }

      .includes-list {
        .include-item {
          &::before {
            background: $blue;
          }
        }
      }
    }

    .select-row {
      border-top: 1px solid rgba($white, 0.2);

      .just-in-case {
        color: rgba($white, 0.5);
      }
    }

    .includes-list {
      .include-item {
        &::before {
          background: $white;
        }
      }
    }
  }
}

</style>