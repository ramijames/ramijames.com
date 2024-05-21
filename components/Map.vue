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
  left: $p-desktop;
  bottom: $p-desktop;
  display:flex;
  flex-direction: column;
  z-index: 9999;
  font-size: $font-size-xs;
  font-family: $font-family-secondary;
  color: $black;
  font-weight: bold;
  padding: $spacing-md $spacing-md;

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
      background-color: $blue;
    }
  }
}

.dark #map {
  color: $white;

  &::after {
    background: rgba($white, 0.8);
  }

  &::before {
    background: rgba($white, 0.8);
  }

}

</style>