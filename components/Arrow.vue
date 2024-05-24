<template>
  <div id="arrow">
    <svg width="32" height="19" viewBox="0 0 32 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L16 16L30 2" stroke="white" stroke-width="2"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">

@import '../assets/variables';

#arrow {
  position: fixed;
  bottom: 0;
  margin-bottom: 5vh;
  animation: bounce 2s infinite;
  z-index: 100;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  svg path {
    stroke: $blue;
  }
}

.dark #arrow svg path {
  stroke: white;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
  
}

</style>