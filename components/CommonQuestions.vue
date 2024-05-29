<template>
  <section id="common-questions" class="general-main">
    <h2>Common Questions about the service</h2>
  </section>
  <div class="questions general-main">
    <div class="single-question" v-for="(question, index) in questions" :key="index">
      <h3>{{ question.question }}</h3>
      <p>{{ question.answer }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      questions: [
        {
          question: 'Why not just hire a designer full-time?',
          answer: 'That’s a great question! At some point in your journey it may be beneficial for you to do so. If you’re just starting out, there is a real cost associated with searching for, vetting, and hiring a designer. Working with me, you can skip that phase and get straight to work today.'
        },
        {
          question: 'Why not hire an agency?',
          answer: 'Agencies are great for some projects, but they can be expensive and slow. You may have to wait weeks or months to get your project started. With me, you can get started today.'
        },
        {
          question: 'Who is creating the designs?',
          answer: 'These designs and their implementations are only created by Rami James. I do not outsource any of the work unless there is a prior agreement in place to accommodate some scaling that may be required.'
        },
        {
          question: 'What if I have a more complex project and need all of your time?',
          answer: 'That is something we can discuss in a one-on-one call. I have a limited number of slots available for clients who need more of my time. If you need more than what is available, we can discuss a custom plan that fits your needs.'
        },
        {
          question: 'What if I do not like the designs?',
          answer: 'I will keep iterating on the designs until you are satisfied. If you are not satisfied, you can cancel your subscription at any time. I want you to be happy with the work that I do for you.'
        },
        {
          question: 'Are there refunds if I don’t like the service?',
          answer: 'I do not offer refunds for the service. If you are not satisfied with the work, you can cancel your subscription at any time.'
        },
      ]
    }
  }
}


</script>