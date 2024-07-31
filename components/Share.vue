<template>
  <div id="share">
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
          name: 'Facebook',
          icon: 'facebook-dark',
          url: 'https://www.facebook.com/sharer/sharer.php?u=',
          message: 'Check out this article on'
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
  margin: $spacing-lg 0;
}

</style>