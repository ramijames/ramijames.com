<template>
  <div id="share" class="w-content">
    Share article:
    <a v-for="social in socials" 
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
          icon: 'twitter-light',
          url: 'https://twitter.com/intent/tweet?url=',
          message: 'Check out this article by @ramijames on'
        },
        {
          name: 'LinkedIn',
          icon: 'linkedin-light',
          url: 'https://www.linkedin.com/feed/?shareActive=true&text=',
          message: 'Check out this article by @ramijames on'
        },
        {
          name: 'Email',
          icon: 'mail-light',
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
  justify-content: flex-start;
  gap: $spacing-md;
  color: rgba($black, 0.5);
  margin-bottom: $spacing-md;
}

</style>