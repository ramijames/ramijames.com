<template>
  <main>
    <Woosh :numberOfElements="10" :size="40" color="#ff9900" :borderWidth="1" animationStyle="default" />
  </main>
</template>

<script>

import Woosh from './Woosh.vue'

export default {
  components: {
    Woosh
  }
}

</script>