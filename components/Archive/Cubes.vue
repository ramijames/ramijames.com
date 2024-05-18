<template>
  <main>
    <div class="cube">
      <div class="top"></div>
      <div class="right"></div>
      <div class="bottom"></div>
      <div class="left"></div>
      <div class="front"></div>
      <div class="back"></div>
    </div>
  </main>
</template>

<style scoped lang="scss">

.cube {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  animation: spin 60s infinite;
  position: absolute;
  width: 600px;
  height: 600px;
  scale:4;
  top:10%;
  left:10%;
  z-index: 0;
}

.cube div {
  width: 400px;
  height: 400px;
  text-align: center;
  border:2px solid rgba(0, 0, 0, 0);
  border-radius: 1px;
  display: block;
  position: absolute;
  background: transparent;
  box-shadow: inset 0px 4px 10px rgba(255, 247, 0, 0.1), 
                  0px 0px 20px rgba(211, 99, 252, 0.132), 
                  0px 100px 100px rgba(240, 221, 255, 0.1), 
                  inset 0px 0px 20px rgba(252, 99, 201, 0.232);
}

    .dark .cube div {
      box-shadow: inset 0px 4px 10px rgba(161, 49, 231, 0.1), 
                  0px 0px 20px rgba(161, 49, 231, 0.4), 
                  0px 100px 100px rgba(240, 221, 255, 0.3), 
                  inset 0px 0px 20px #d815157b;
      background: linear-gradient(45deg, 
                                      rgba(161, 49, 231, 0.4) 4%, 
                                      rgba(161, 49, 231, 0.1) 20%, 
                                        rgba(0, 0, 0, 0.341) 100%);
    }

.cube div.top {
  -webkit-transform: rotateX(90deg); 
  transform: rotateX(90deg); 
  margin-top: -200px;
}

.cube div.right {
  -webkit-transform: rotateY(90deg); 
  transform: rotateY(90deg); 
  margin-left: 200px;
}

.cube div.bottom {
  -webkit-transform: rotateX(-90deg); 
  transform: rotateX(-90deg); 
  margin-top: 200px;
  opacity: 0.2;
}

.cube div.left {
  -webkit-transform: rotateY(-90deg); 
  margin-left: -200px;
  transform: rotateY(-90deg); 
}

.cube div.front {
  -webkit-transform: translateZ(200px);
  transform: translateZ(200px);
}

.cube div.back {
  -webkit-transform: translateZ(-200px) rotateX(180deg);
  transform: translateZ(-200px) rotateX(180deg);
}

@keyframes spin {
  0% {
    -webkit-transform: rotateX(-60deg) rotateY(0deg);
    transform: rotateX(-60deg) rotateY(0deg);
    scale:1.6;
  }
  50% {
    -webkit-transform: rotateX(-60deg) rotateY(180deg);
    transform: rotateX(-60deg) rotateY(180deg);
    scale:2.4;
  }
  100% {
    -webkit-transform: rotateX(-60deg) rotateY(360deg);
    transform: rotateX(-60deg) rotateY(360deg);
    scale:1.6;
  }
}

</style>