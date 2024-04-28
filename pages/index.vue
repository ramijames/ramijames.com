<template>
  <section class="home">
    <section class="core">
      <nuxt-link to="/build">Things I'm building</nuxt-link>
      <div class="cube">
        <div class="top"></div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <nuxt-link to="/thoughts">Things I'm thinking</nuxt-link>
    </section>
    <p>Hi, I'm <strong>Rami</strong>. I'm a <strong>web developer</strong> and <strong>designer</strong> based in <strong>Boston</strong> and <strong>Israel</strong>.</p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
</script>

<style scoped>

.home {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.core {
  display: flex;
  align-items: center;
  height:200px;
}

.core a {

}

.cube {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation: spin 30s infinite ease-out;
  animation: spin 30s infinite ease-out;
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 4rem;
}

.cube div {
   width: 100px;
   height: 100px;
   line-height: 100px;
   text-align: center;
   box-shadow: inset 0px 0px 0px 2px rgba(0,0,0);
   background: transparent;
   display: block;
   position: absolute;
}

.cube div.top {
  -webkit-transform: rotateX(90deg); 
  transform: rotateX(90deg); 
  margin-top: -50px;
}

.cube div.right {
  -webkit-transform: rotateY(90deg); 
  transform: rotateY(90deg); 
  margin-left: 50px;
}

.cube div.bottom {
  -webkit-transform: rotateX(-90deg); 
  transform: rotateX(-90deg); 
  margin-top: 50px;
}

.cube div.left {
  -webkit-transform: rotateY(-90deg); 
  margin-left: -50px;
  transform: rotateY(-90deg); 
}

.cube div.front {
  -webkit-transform: translateZ(50px);
  transform: translateZ(50px);
}

.cube div.back {
  -webkit-transform: translateZ(-50px) rotateX(180deg);
  transform: translateZ(-50px) rotateX(180deg);
}

@keyframes spin {
  0% {
    -webkit-transform: rotateX(-20deg) rotateY(20deg);
    transform: rotateX(-20deg) rotateY(20deg);
  }
  100% {
    -webkit-transform: rotateX(-20deg) rotateY(740deg);
    transform: rotateX(-20deg) rotateY(740deg);
  }
}

</style>