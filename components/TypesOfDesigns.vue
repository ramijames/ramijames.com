<template>
  <MergedProjects />
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { computed } from 'vue';

export default {
  setup() {
    const themeStore = useThemeStore();

    return {
      currentTheme: computed(() => themeStore.currentTheme),
    }
  },
  components: {

  },
  computed: {
    notHome() {
      return this.$route.path !== '/';
    }
  },
}
</script>

<style scoped lang="scss">

@import './assets/variables';

#types-of-designs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;

  &.drop-top {
    border-top: none;
  }

  h2 {
    margin-top: 0;
    text-align: center;
  }

  .things {
    display: flex;
    flex-direction: row;
    gap: $spacing-sm;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    flex-wrap: wrap;
  }

  .types {
    display:flex;
    flex-direction: row;
    gap: $spacing-xs;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    flex-wrap: wrap;

    .single-type {
      padding: $spacing-sm $spacing-md;
      font-size: $font-size-md;

      span {
        color: $black;
      }

      &:nth-child(1) { 
        border-color: $green; 

        span {
          color: $green;
        }
      }

      &:nth-child(2) { 
        border-color: $purple; 

        span {
          color: $purple;
        }
      }

      &:nth-child(3) { 
        border-color: $blue; 

        span {
          color: $blue;
        }
      }

      &:nth-child(4) { 
        border-color: $teal; 

        span {
          color: $teal;
        }
      }

      &:nth-child(5) { 
        border-color: $orange; 

        span {
          color: $orange;
        }
      }

      &:nth-child(6) { 
        border-color: $mint; 

        span {
          color: $mint;
        }
      }

      &:nth-child(7) { 
        border-color: $blue; 

        span {
          color: $blue;
        }
      }

      &:nth-child(8) { 
        border-color: $green; 

        span {
          color: $green;
        }
      }



      @media screen and (max-width: 1000px){
        padding: $spacing-xs $spacing-sm;
        font-size: $font-size-sm;
      }
    }
  }

}

.work-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-template-rows: repeat(4, 150px); 
  gap: $spacing-md;
  grid-auto-flow: row;
  grid-template-areas:
    "one-top two-top three-top four-top"
    "one-top two-bottom three-top four-bottom"
    "one-top two-bottom three-top four-bottom"
    "one-bottom two-bottom three-bottom four-bottom";
  width: 100%;
  min-height: 65vh;
  

  div { 

    img {
      width: 100%;
      height: 100%;
      max-height: 600px;
      object-fit: cover;
      border-radius: $br-lg;
    }
  }

  @media screen and (max-width: 1000px){
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $spacing-md;
    min-height: auto;

    div {
      width: calc(50% - $spacing-md / 2);
      height: 200px;
      background-color: $white-dark;
      border-radius: $br-lg;
    }
  }

  div:nth-child(1) { 
    grid-area: one-top; 
    background-color: $white-dark;
    border-radius: $br-lg;
  }

  div:nth-child(2) { 
    grid-area: one-bottom; 
    background-color: $white-dark;
    border-radius: $br-lg;
  }

  div:nth-child(3) { 
    grid-area: two-top; 
    background-color: $white-dark;
    border-radius: $br-lg;
  }

  div:nth-child(4) { 
    grid-area: two-bottom; 
    background-color: $white-dark;
    border-radius: $br-lg;
  }

  div:nth-child(5) { 
    grid-area: three-top; 
    background-color: $white-dark;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

  div:nth-child(6) { 
    grid-area: three-bottom; 
    background-color: $white-dark;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

  div:nth-child(7) { 
    grid-area: four-top; 
    background-color: $white-dark;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

  div:nth-child(8) { 
    grid-area: four-bottom; 
    background-color: $white-dark;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

}

.one-top { grid-area: one-top; }
.one-bottom { grid-area: one-bottom; }
.two-top { grid-area: two-top; }
.two-bottom { grid-area: two-bottom; }
.three-top { grid-area: three-top; }
.three-bottom { grid-area: three-bottom; }
.four-top { grid-area: four-top; }
.four-bottom { grid-area: four-bottom; }

.one { grid-area: one; }
.two { grid-area: two; }
.three { grid-area: three; }
.four { grid-area: four; }

</style>