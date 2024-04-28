<template>
  <nav class="main-nav">
    <nuxt-link to="/">Home</nuxt-link>
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
    <ThemeSwitcher />
  </nav>
</template>

<style scoped>

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  width: auto;
}

.main-nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-family: 'IBM Plex Mono';
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

  .dark .main-nav a {
    color: white;
  }

.router-link-active, 
.router-link-exact-active {
  text-decoration: underline !important;
}

.core {
  display: flex;
  align-items: center;
}

.cube {
  transform-style: preserve-3d;
  animation: spin 60s infinite;
  position: relative;
  width: 100px;
  height: 100px;
  scale: 0.5;
  margin: 0 2rem;
}

.cube div {
   width: 100px;
   height: 100px;
   line-height: 100px;
   text-align: center;
   box-shadow: inset 0px 0px 0px 3px rgba(0,0,0);
   background: transparent;
   display: block;
   position: absolute;
}

    .dark .cube div {
      box-shadow: inset 0px 0px 0px 3px rgba(255,255,255);
    }

.cube div.top {
  transform: rotateX(90deg); 
  margin-top: -50px;
}

.cube div.right {
  transform: rotateY(90deg); 
  margin-left: 50px;
}

.cube div.bottom { 
  transform: rotateX(-90deg); 
  margin-top: 50px;
}

.cube div.left {
  margin-left: -50px;
  transform: rotateY(-90deg); 
}

.cube div.front {
  transform: translateZ(50px);
}

.cube div.back {
  transform: translateZ(-50px) rotateX(180deg);
}

@keyframes spin {
  0% {
    transform: rotateX(-20deg) rotateY(20deg);
  }
  50% {
    transform: rotateX(-20deg) rotateY(740deg);
  }
  100% {
    transform: rotateX(-20deg) rotateY(20deg);
  }
}

</style>