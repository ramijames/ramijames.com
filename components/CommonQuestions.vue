<template>
  <section id="common-questions" class="general-main">
    <a name="questions"></a>
    <h2>Common Questions about the service</h2>
  </section>
  <div class="questions general-main">
    <!-- <div class="single-question closed" v-for="(question, index) in questions" :key="index">
      <h4 class="question">{{ question.question }}</h4>
      <p class="answer">{{ question.answer }}</p>
    </div> -->

    <div class="single-question" v-for="(question, index) in questions" :key="index" :class="{ open: openedQuestion === index, closed: openedQuestion !== index }">
      <h4 class="question" @click="openQuestion(index)">{{ question.question }}</h4>
      <p class="answer" v-if="openedQuestion === index">{{ question.answer }}</p>
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
          answer: 'That’s a great question! At some point in your journey it may be beneficial for you to do so. If you’re just starting out, there is a real cost associated with searching for, vetting, and hiring a designer and a developer. Working with me, you can skip those phases and get straight to work today.'
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
          question: 'What if I do not like the designs or the implementation?',
          answer: 'I will keep iterating on the designs until you are satisfied. If you are not satisfied, you can cancel your subscription at any time. I want you to be happy with the work that I do for you.'
        },
        {
          question: 'Are there refunds if I don’t like the service?',
          answer: 'I do not offer refunds for the service. If you are not satisfied with the work, you can cancel your subscription at any time.'
        },
      ],
      openedQuestion: null,
    }
  },
  methods: {
    openQuestion(index) {
      this.openedQuestion = index;
    },
  },
}


</script>

<style scoped lang="scss">

@import './assets/variables';

#common-questions {
  padding-bottom: $spacing-lg;
}

.questions {
  padding-top:0;

  .single-question {
    cursor: pointer;

    &.closed {

      .question {
        color: $red;
        font-family: $font-family-main;
        font-size: $font-size-lg;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        
        &::after {
          content: '+';
          font-size: $font-size-xl;
          transiation: all 0.3s ease-in-out;
        }
      }

    }

    &.open {

      .question {
        color: $purple;
        font-family: $font-family-main;
        font-size: $font-size-lg;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        
        &::after {
          content: '+';
          font-size: $font-size-xl;
          transform: rotate(45deg);
        }
      }

    }

  }
}

</style>