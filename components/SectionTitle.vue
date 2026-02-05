<template>
  <div class="section-title" :class="centered ? 'centered' : ''">
    <h1 class="">{{ title }}</h1>
    <h4 class="" v-if="subtitle">{{ subtitle }}</h4>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  centered: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.section-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  
  h1 {
    line-height: 100%;
    text-align: left;
  }

  &.centered {
    h2, h4 {
      text-align: center;
      width:100%;
    }
  }

  @media screen and (max-width: 768px){
    align-items: center;
    text-align: center;
  }

  h2 {
    margin-top: $spacing-md;
    margin-bottom: $spacing-sm;
  }

  h4 {
    margin-top: 0;
  }
}

.article-extras .section-title h2,
.article-extras .section-title h4 {
  width: 100%;
  text-align:center;
}

</style>