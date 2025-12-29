<template>
  <ThoughtsHeader title="Quantifying your documentation's success" slug="/thoughts/quantifying-your-documentations-success" />
  <PageHeader title="Quantifying your documentation's success" />
  <main class="w-content page-top">
    <section class="content">

      <img src="/articles/quantifying.png" alt="Quantifying your documentation's success">
      <p>The primary challenge faced by technical writers often boils down to how to evaluate the effectiveness of what you write. </p>
      <p>You build some documentation and you think it is great. How do you know if you are right? How do you prove it to upper management? How do you really, really know?</p>

      <p>I’d like to talk quickly about an <a href="https://passo.uno/docs-observability-do11y/">approach that I came</a> across called &quot;documentation observability&quot; (<a href="https://www.linkedin.com/in/fabrizioferri/">grazie, Fabrizio!</a>) that I think is an excellent candidate solution for those whose documentation is part of a larger product strategy, and who need to know if they are hitting the mark or not. </p>
      <p>This methodology isn’t for the faint of heart and does require substantial extra integration efforts. I’d like to convince you that it is worth it.</p>
      <h3 id="how-do-we-measure-docs-success-today">How do we measure docs&#39; success today?</h3>
      <p>Roles like technical writing and developer advocacy are often viewed as costs in an organization, and we need to be able to measure the impact of documentation on business goals and how it contributes to a product’s success. </p>
      <p>We have to prove our worth, which means measurable data that can be quantified. Was the work that we did worth the cost of production? How do we measure that?</p>
      <p>Traditional metrics such as page views and reduction of support tickets are a good start, but I’d like to argue that these are often indirect and may not fully capture the real value of documentation for stakeholders. They show activity, but do not give any real indication of end user success rates.</p>
      <p>While qualitative user research and surveys can be better for gauging actual user satisfaction, they have their own issues. Speaking directly with users can be expensive, time consuming, and often suffers from sampling limitations. If you can’t get the budget to do user research consistently and at scale, they have dubious value. </p>
      <p>Additionally, I wrote <a href="https://www.ramijames.com/thoughts/iterate-relentlessly">about how you can’t necessarily trust what users tell you</a> when iterating through a product life cycle. What users tell you is often only a slice of the full picture and can not be taken at face value.</p>
      <h3 id="integrating-success-metrics-into-a-user-journey">Integrating success metrics into a User Journey</h3>
      <p>Documentation observability involves directly connecting documentation to product success metrics. The idea is to treat documentation as an integral part of the user journey and the product itself. </p>
      <p>Typically, when building developer documentation you track page views within a set of docs. This gives you a good idea of what is popular and useful. You’ll also generally be able to see if there is a big bounce rate, or a specific place within your documentation that shows a large user drop-off rate. It gives you hints about what works, and where you are failing your users.</p>
      <p>Critically, what you don’t see measured is whether or not your users actually succeeded at the specific task that they were trying to achieve.</p>
      <p>Let’s take a look at a better way to track a developer’s learning journey, and how we can pull success metrics from that.</p>
      <p>Lisa is a developer who is new to an ecosystem. She’s trying to learn how to use an API and is making her way through the documentation that we’ve put together for her.</p>
      <p>There is a specific API call that she’s interested in using, and can’t seem to get the format correct.</p>
      <p>From our perspective we have the opportunity to track a whole host of events that together tell a story. We see Lisa enter the docs site, navigate to our tutorial, we see her unique user id make a malformed call to the api, we see her check other pages in the docs, and finally we see her perform a successful call to the api. </p>
      <p>We get to watch Lisa struggle and in the end succeed.</p>
      <p>Documentation observability means that we are adding documentation task specific events to non-documentation products like the API itself. What this allows is for us to create a dashboard that follows the user journey, and assign passing or failing metrics to those journeys. If we see that there is a large failure rate, we have a specific event to analyze that allows us to dig deeper and investigate why.</p>
      <p>At its core, Documentation Observability is really an extension of the core tenets of <a href="https://www.ibm.com/topics/observability">Software Observability</a>. It’s a matter of shifting a developer’s perspective to include the documentation that end users use as part of the scope of what “software” actually is. This approach allows technical writers to troubleshoot issues in their documentation and to answer questions like when docs were consumed during product usage, whether they led to normal operation, and if increased documentation consumption correlates with increased product usage.</p>
      <h3 id="challenges-to-implementation-of-documentation-observability">Challenges to Implementation of Documentation Observability</h3>
      <p>The core challenge to implementation of Documentation Observability is that it requires treating documentation planning, design, and infrastructure similarly to feature planning, design, and infrastructure for the software being documented. </p>
      <p>For teams that are stretched thin and facing tight timelines, this can be a big ask. It inevitably means that you’ll leave valuable features on the cutting room floor when asked to make a decision about what to implement.</p>
      <p>Beyond the expanded development expectations, this methodology also impacts time to market which can be a tricky thing if what you’re working on is hot. The faster that you get your product into your user’s hands, the more likely your product is to achieve that first mover advantage.</p>
      <h3 id="getting-stakeholders-on-board">Getting Stakeholders on Board</h3>
      <p>If your product depends on developers or other advanced end-users to use it, and there is a high probability that they will fail, my instinct says that better documentation should trump development of new features. </p>
      <p>You and your team have to know for certain that people can reliably use the features that you already have. That means documentation and some methodology for quantifying the success of them.</p>
      <p>I am emphasizing the need to view documentation as an essential part of the user journey and product, and it encourages a mindset shift in how documentation is planned, designed, and measured for success when speaking to my clientele. I encourage you to do the same.</p>
      <ArticleAddendum />
    </section>
  </main>
  
  <Footer />
</template>

<script setup>

useHead({
  title: () => "Are your docs good?"
})

useSeoMeta({
  title: "Are your docs good?",
  ogTitle: "Are your docs good?",
  description: "The primary challenge faced by technical writers often boils down to how to evaluate the effectiveness of what you write. You build some documentation and you think it is great. How do you know if you are right? How do you prove it to upper management? How do you really, really know?",
  ogDescription: "The primary challenge faced by technical writers often boils down to how to evaluate the effectiveness of what you write. You build some documentation and you think it is great. How do you know if you are right? How do you prove it to upper management? How do you really, really know?",
  ogImage: "/articles/quantifying.png",
  url: 'https://www.ramijames.com/thoughts/',
  twitterTitle: "Are your docs good?",
  twitterDescription: "The primary challenge faced by technical writers often boils down to how to evaluate the effectiveness of what you write. You build some documentation and you think it is great. How do you know if you are right? How do you prove it to upper management? How do you really, really know?",
  twitterImage: "/articles/quantifying.png",
  twitterCard: 'summary_large_image',
})

</script>