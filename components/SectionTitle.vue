<template>
  <div class="section-title">
    <h2>{{ title }}</h2>
    <h4>{{ subtitle }}</h4>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables.scss';

.section-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: $spacing-md;

  @media screen and (max-width: 768px){
    align-items: center;
    text-align: center;
  }

  h2 {
    margin-top: 0;
    margin-bottom: $spacing-sm;
  }

  h4 {
    margin-top: 0;
  }
}

</style>