<template>
  <main>
    <div class="slivers">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
      <div class="four"></div>
      <div class="five"></div>
      <div class="six"></div>
      <div class="seven"></div>
      <div class="eight"></div>
      <div class="nine"></div>
      <div class="ten"></div>
      <div class="eleven"></div>
      <div class="twelve"></div>
      <div class="thirteen"></div>
      <div class="fourteen"></div>
    </div>
  </main>
</template>

<style scoped lang="scss">

@keyframes spin {
  0% {
    -webkit-transform: rotateX(-60deg) rotateY(0deg);
    transform: rotateX(-60deg) rotateY(0deg);
    scale:1.6;
  }
  50% {
    -webkit-transform: rotateX(-60deg) rotateY(180deg);
    transform: rotateX(-60deg) rotateY(180deg);
    scale:.7;
  }
  100% {
    -webkit-transform: rotateX(-60deg) rotateY(360deg);
    transform: rotateX(-60deg) rotateY(360deg);
    scale:1.6;
  }
}

.slivers {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  animation: slivers 120s infinite;
  position: fixed;
  width: 200px;
  height: 200px;
  scale:.7;
  top:0px;
  left:100px;
  z-index: 0;
}

    @media screen and (max-width: 768px) {
      .slivers {
        opacity: 0.2;
      }
    }

    .slivers div {
      width: 400px;
      height: 400px;
      text-align: center;
      border:1px solid rgba(0,0,0,0);
      border-radius: 1px;
      display: block;
      position: absolute;
      background: transparent;
      box-shadow: inset 0px 4px 10px rgba(255, 247, 0, 0.1), 
                  0px 0px 20px rgba(211, 99, 252, 0.132), 
                  0px 100px 100px rgba(240, 221, 255, 0.1), 
                  inset 0px 0px 20px rgba(252, 99, 201, 0.232);
    }

    .dark .slivers div {
      box-shadow: inset 0px 4px 10px rgba(161, 49, 231, 0.1), 
                  0px 0px 20px rgba(161, 49, 231, 0.4), 
                  0px 100px 100px rgba(240, 221, 255, 0.3), 
                  inset 0px 0px 20px #d815157b;
      background: linear-gradient(45deg, 
                                      rgba(161, 49, 231, 0.4) 4%, 
                                      rgba(161, 49, 231, 0.1) 20%, 
                                        rgba(0, 0, 0, 0.341) 100%);
    }

    .slivers div.one {
      transform: translateZ(0px);
      opacity:0;
    }

    .slivers div.two {
      transform: translateZ(40px);
      opacity:0.1;
    }

    .slivers div.three {
      transform: translateZ(80px);
      opacity:0.2;
    }

    .slivers div.four {
      transform: translateZ(120px);
      opacity:0.3;
    }

    .slivers div.five {
      transform: translateZ(160px);
      opacity:0.4;
    }

    .slivers div.six {
      transform: translateZ(200px);
      opacity:0.5;
    }

    .slivers div.seven {
      transform: translateZ(240px);
      opacity:0.6;
    }

    .slivers div.eight {
      transform: translateZ(280px);
      opacity:0.7;
    }

    .slivers div.nine {
      transform: translateZ(320px);
      opacity:0.8;
    }

    .slivers div.ten {
      transform: translateZ(360px);
      opacity:0.9;
    }

    .slivers div.eleven {
      transform: translateZ(400px);
      opacity:1;
    }

    .slivers div.twelve {
      transform: translateZ(440px);
      opacity:0.9;
    }

    .slivers div.thirteen {
      transform: translateZ(480px);
      opacity:0.8;
    }

    .slivers div.fourteen {
      transform: translateZ(520px);
      opacity:0.7;
    }

  @keyframes slivers {
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