<template>
  <div class="container">
    <div
      v-for="i in numberOfElements"
      :key="i"
      :style="{
        width: size + '%',
        height: size + '%',
        backgroundColor: color,
        borderWidth: borderWidth + 'px',
        animation: animationStyle + ' 2s infinite'
      }"
      class="element"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    numberOfElements: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    borderWidth: {
      type: Number,
      required: true
    },
    animationStyle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.container {
  perspective: 1000px;
}

.element {
  position: absolute;
  border-style: solid;
  border-color: black;
  transform-style: preserve-3d;
}
</style>