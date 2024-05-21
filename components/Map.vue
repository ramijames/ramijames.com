<template>
  <div id="map">
    <div v-for="location in locations" class="location" :class="location.active ? 'active' : ''">
      <div class="bar"></div>
      <div class="title">{{ location.title }}</div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      locations: [
        {
          title: 'Home',
          active: true
        },
        {
          title: 'Projects',
          active: false
        },
        {
          title: 'Contact',
          active: false
        }
      ]
    }
  }
}


</script>

<style scoped lang="scss">

@import './assets/variables';

#map {
  position:fixed;
  left: calc($spacing-lg - $spacing-xs * 2);
  bottom: calc($spacing-lg - $spacing-xs * 2);
  display:flex;
  flex-direction: column;
  z-index: 9999;
  font-size: $font-size-xs;
  font-family: $font-family-secondary;
  color: $black;
  font-weight: bold;
  padding: $spacing-xs $spacing-sm;
  // backdrop-filter: blur(8px);
  // background: rgba($white, 0.8);
  border-left: 2px solid rgba($blue-light, 0.2);
  border-bottom: 2px solid rgba($blue-light, 0.2);

  .location {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: $spacing-xxs 0;

    .title {
      opacity: 0;
      transition: all 0.24s ease-in-out;
    }

    .bar {
      width: 18px;
      height: 2px;
      border-radius: 3px;
      background: rgba($blue-light,0.2);
      margin-right: $spacing-xs;
      transition: all 0.24s ease-in-out;
    }
  }

  .location.active,
  .location:hover {
    
    .title {
      opacity: 1;
    }

    .bar {
      background-color: $blue-light;
    }
  }
}

.dark #map {
  color: $white;
  background: rgba($black, 0.8);
}

</style>