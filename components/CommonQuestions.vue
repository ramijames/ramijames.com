<template>
  <section id="common-questions" class="general-main">
    <h2>Common Questions about the service</h2>
  </section>
  <div class="questions">
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
          question: 'What is the service?',
          answer: 'The service is a platform that allows you to connect with other users and share your thoughts and ideas.'
        },
        {
          question: 'How do I sign up?',
          answer: 'You can sign up by clicking the "Sign Up" button on the homepage.'
        },
        {
          question: 'How much does it cost?',
          answer: 'The service is free to use.'
        },
        {
          question: 'How do I contact support?',
          answer: 'You can contact support by emailing.'
        }
      ]
    }
  }
}


</script>