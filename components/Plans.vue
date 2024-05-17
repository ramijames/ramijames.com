<template>
  <main id="plans">
    <h2>Getting Started</h2>  
    <p class="tiny-sub-title">Your vision deserves to see the light.</p>

    <section>
      <section id="plan-tabs">
        <div class="plan-tab" v-for="(plan, index) in plans" :key="index">
          <h3>{{ plan.title }}</h3>
        </div>
      </section>
    </section>
  </main>
</template>

<script>

export default {
  name: 'Plans',
  data() {
    return {
      plans: [
        {
          title: 'Basic',
          description: 'Get started with the basics.',
          price: '$10/month'
        },
        {
          title: 'Pro',
          description: 'Get started with the basics.',
          price: '$20/month'
        },
        {
          title: 'Enterprise',
          description: 'Get started with the basics.',
          price: '$30/month'
        }
      ]
    };
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

#plans {
  max-width: 500px;
  margin: 0 auto;
  width: 100%;

  h2 {
    font-size: 3.051rem; 
    line-height: 3.051rem;
    text-align: center;
    margin:0 auto $spacing-xs;
    color:$gray-dark;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: $spacing-xl;
    text-align: center;
    color:$gray-md;
    font-family: 'Bitter', serif;
  }
}

</style>