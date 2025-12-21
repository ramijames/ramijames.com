<template>
  <div id="share" class="w-content">
    <a v-for="social in socials" class="button" 
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
          name: 'Twitter',
          icon: 'twitter-dark',
          url: 'https://twitter.com/intent/tweet?url=',
          message: 'Check out this article by @ramijames on'
        },
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
  gap: $spacing-md;
  color: rgba($black, 0.5);
  margin: $spacing-lg auto;
  padding:  $spacing-sm 0;
  border-top: 1px solid rgba($black, 0.1);
  border-bottom: 1px solid rgba($black, 0.1);

  img {
    outline: none;
  }
}

</style>