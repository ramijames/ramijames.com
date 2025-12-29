<template>
  <div id="share">
    <span>Share on:</span>
    <a v-for="social in socials" class="button small blue" 
       :key="social.name" 
       :href="social.url + encodeURIComponent('https://www.ramijames.com' + route)">
      <img :src="'/' + social.icon + '.svg'" alt="social.name" />
    </a>
  </div>
</template>

<script>

export default {
  name: 'Share',
  props: {
    route: String,
    topic: String
  },
  data() {
    return {
      socials: [
        {
          name: 'LinkedIn',
          icon: 'linkedin-dark',
          url: 'https://www.linkedin.com/feed/?shareActive=true&text=',
          message: 'Check out this article by @ramijames on'
        },
        {
          name: 'Email',
          icon: 'mail-dark',
          url: 'mailto:?body=',
          message: 'Check out this article by Rami James on'
        }
      ]
    }
  },
}

</script>

<style scoped lang="scss">

@import './assets/variables';

#share {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: $spacing-xs;

  span {
    font-size: $font-size-sm;
    margin-right: $spacing-xs;
    color: $blue;

    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  .button {
    padding: $spacing-xs;
  }

  img {
    outline: none;
    width:20px;
  }
}

</style>