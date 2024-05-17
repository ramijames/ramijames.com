<template>
  <main id="word-blocks">
    <h2>Why work with me?</h2>
    <div class="blocks-container">
      <div class="blocks-top">
        <div class="generic-title blue">Advantage</div>
        <div class="blocks-text blue">Super-duper fast.<br>Like, really fast.</div>
      </div>
      <div class="blocks-top-left">
        <div class="generic-title">Advantage</div>
        <div class="blocks-text">Decades of experience, at your fingertips.</div>
      </div>
      <div class="blocks-top-right">
        <div class="generic-title blue">Advantage</div>
        <div class="blocks-text blue">High-quality means it is designed and developed in the right way.</div>
      </div>
      <div class="blocks-main">
        <div class="generic-title">Advantages mean</div>
        <div class="blocks-text big">You get exactly what you need: <span class="highlight">a professional hired-gun</span>, dedicated to your cause, right now.</div>
      </div>
      <div class="blocks-bottom-left">
        <div class="generic-title blue">Advantage</div>
        <div class="blocks-text blue">Skip the hiring phase, get right to work.</div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

@import './assets/variables';

#word-blocks h2 {
  font-size: 3.051rem; 
  line-height: 3.051rem;
  text-align: center;
  margin:0 auto $spacing-lg;
  color:$gray-md;
}

.dark #word-blocks h2 {
  color:$white;
}

.blocks-container {
  max-width: 1200px;
  width:100%;
  margin:0 auto $spacing-xl;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr; 
  gap: $spacing-md; 
  grid-template-areas: 
    "blocks-top-left blocks-top blocks-top blocks-top-right"
    "blocks-top-left blocks-main blocks-main blocks-main"
    "blocks-bottom-left blocks-main blocks-main blocks-main"; 
}

.blocks-top { 
  grid-area: blocks-top; 
  background: rgba($blue, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: $main-shadow;
  border-radius: $br-md;
  padding: $spacing-md;
}

.blocks-top-left { 
  grid-area: blocks-top-left; 
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  box-shadow: $main-shadow;
  border-radius: $br-md;
  padding: $spacing-md;
}

.blocks-top-right { 
  grid-area: blocks-top-right; 
  background: rgba($blue, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: $main-shadow;
  border-radius: $br-md;
  padding: $spacing-md;
}

.blocks-main { 
  grid-area: blocks-main; 
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  box-shadow: $main-shadow;
  border-radius: $br-md;
  padding: $spacing-md;
}

.blocks-bottom-left { 
  grid-area: blocks-bottom-left; 
  background: rgba($blue, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: $main-shadow;
  border-radius: $br-md;
  padding: $spacing-md;
}

.blocks-text {
  margin-top:$spacing-sm;
  font-size: 1.562rem; 
}

    .blocks-text.blue {
      color: $white;
    }

    .blocks-text.big {
      font-size: 2.441rem; 
      width:65%;

      .highlight {
        color: $blue-light;
      }
    }

</style>