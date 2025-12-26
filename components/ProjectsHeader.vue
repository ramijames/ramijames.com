<template>
 <section class="single-project-header">
  <section class="navigation">
    <button class="small blue" @click="$router.back()">
      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.37094 0.368408L0.739746 7.36842L8.37094 14.3684" stroke="white"/>
        <path d="M0.83252 7.36841H17.3454" stroke="white"/>
      </svg>
    </button>
    <button class="small blue" @click="navigateTo('/products')">All projects</button>
  </section>
  <section class="project-details">
    <img :src="logo" :alt="project" />
    <!-- <span>{{ project }}</span> -->
  </section>
  
 </section>
</template>

<script setup>

const props = defineProps({
  project: String,
  logo: String
});

</script>

<style scoped lang="scss">
@import './assets/variables';

.single-project-header {
  background: linear-gradient(180deg, transparent 67%, rgba($blue, 0.13));
  border-bottom: $border;
  padding: $spacing-xs $spacing-sm;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-sm;

  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-xs;
  }

  .project-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-xs;

    img {
      max-height: 44px;
    }

    span {
      font-size: $font-size-md;
      text-transform: capitalize;
    }
  }
}

</style>