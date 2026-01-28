<template>
  <PageHeader title="Flavors of Rejection" tagline="Every new mail is hope, crushed." />
  <main class="w-content page-top">
    <div class="rejection-grid w-consistent">

      <div class="rejection-card card-tall text-large">
        <p>We encourage you to visit our careers site as new positions often become available.</p>
      </div>

      <div class="rejection-card">
        <p>We'll be keeping your resume on file in case a future opportunity aligns more closely with your background. Wishing you all the best in your search and continued professional journey.</p>
      </div>

      <div class="rejection-card text-small">
        <p>While we were impressed by your skills and accomplishments, we have decided to move forward with other applicants whose skills and experience better meet our current needs.</p>
      </div>

      <div class="rejection-card card-wide">
        <p>The team was sincerely impressed with your background and qualifications. Unfortunately, after thoughtful consideration, we have decided to continue forward in the process with other candidates.</p>
      </div>

      <div class="rejection-card text-large">
        <p>Unfortunately, we have decided to move forward with other candidates at this time.</p>
      </div>

      <div class="rejection-card card-tall">
        <p>We've been extremely fortunate to have a fantastic response from accomplished candidates such as yourself for this role. However, after careful consideration, we've made the decision to not move forward with the interview process at this time.</p>
      </div>

      <div class="rejection-card text-small">
        <p>Your resume is in our system for future opportunities, and we hope you'll keep an eye on our careers page. Best of luck with your job search!</p>
      </div>

      <div class="rejection-card card-wide">
        <p>We want you to know that our talent team personally reviews each application - we don't use AI in the process. After carefully reviewing your application, we're not able to move forward to the interview stage at this time.</p>
      </div>

      <div class="rejection-card text-large">
        <p>We truly appreciate the time you've taken to apply and your interest in being part of our mission.</p>
      </div>

      <div class="rejection-card card-tall text-small">
        <p>After careful consideration, we have chosen to proceed with other candidates at this time. Please know that your interest in our company is valued, and we want to keep your resume and contact information on file in case a future opportunity arises that aligns with your skills and qualifications.</p>
      </div>

      <div class="rejection-card card-wide">
        <p>After careful consideration, we have decided not to move forward with your application for this position. We are committed to maintaining an honest and supportive recruitment process, while this opportunity wasn't the right fit, we value your interest.</p>
      </div>

      <div class="rejection-card card-wide text-large">
        <p>Unfortunately, the opportunity for which you were under consideration is no longer open.</p>
      </div>

    </div>
    <PostsExtras />
  </main>
  
  <Footer />
</template>

<script setup>

useHead({
  title: () => ``
})

useSeoMeta({
  title: 'Flavors of Rejection',
  ogTitle: 'Flavors of Rejection',
  description: "A collection of rejection responses from companies.",
  ogDescription: "A collection of rejection responses from companies.",
  ogImage: "/articles/flavors-of-rejection.png",
  url: 'https://www.ramijames.com/thoughts/flavors-of-rejection',
  twitterTitle: 'Flavors of Rejection',
  twitterDescription: "A collection of rejection responses from companies.",
  twitterImage: "/articles/flavors-of-rejection.png",
  twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="scss">

.rejection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  padding: $spacing-sm 0;
}

.rejection-card {
  border-radius: $br-sm;
  padding: $spacing-md;
  display: flex;
  align-items: center;
  background-color: rgba($black, 0.85);

  p {
    margin: 0;
    font-family: $font-family-serif;
    line-height: $multiplier;
    color: $white;
  }
}

// Sizes
.card-wide {
  grid-column: span 2;
}

.card-tall {
  grid-row: span 2;
}

// Text sizes
.text-large {
  background-color: $white;

  p {
    font-size: $font-size-xxl;
    font-weight: 200;
    font-style: italic;
    color: $black;
    opacity: 0.5;
  }
}

.text-small p {
  font-size: $font-size-md;
}

// Responsive
@media (max-width: 1000px) {
  .rejection-grid {
    grid-template-columns: 1fr;
  }

  .card-large,
  .card-wide {
    grid-column: span 1;
  }

  .card-large,
  .card-tall {
    grid-row: span 1;
  }
}
</style>