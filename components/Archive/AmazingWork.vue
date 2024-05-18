<template>
  <main id="amazing-work">
    <h2 class="centered">Making something beautiful is my favorite thing</h2>
    <p class="centered">
      For decades, I've been crafting and creating wonderful online experiences for my clients. Here are some of my favorite projects.
    </p>

    <div class="image-row">
      <div class="image-container top" ref="topRow">
        <img v-for="(image, index) in imagesTop" :key="'top-' + index" :src="image" />
        <img v-for="(image, index) in imagesTop" :key="'top-copy-' + index" :src="image" />
      </div>
    </div>
    <div class="image-row">
      <div class="image-container bottom" ref="bottomRow">
        <img v-for="(image, index) in imagesBottom" :key="'bottom-' + index" :src="image" />
        <img v-for="(image, index) in imagesBottom" :key="'bottom-copy-' + index" :src="image" />
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'AmazingWork',
  data() {
    return {
      imagesTop: [
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png', 
              ],
      imagesBottom: [
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png',
                '/products/doodledapp/contract-function-single.png', 
                '/products/random-sandwich/random-sandwich-home.png', 
              ],
    };
  }
}

</script>

<style scoped lang="scss">

#amazing-work {
  padding: 8rem 0;
  background: linear-gradient(0deg, #f6f3f700 0%, #f6f3f7ff 5%, #f6f3f7ff 80%, #f6f3f700 100%);

  h2 {
    margin:0 auto 1rem;
    max-width: 600px;
    text-align: center;

    @media screen and (max-width: 768px) {
      margin: 0 2rem 1rem;
    }
  }

  p {
    max-width: 600px;
    margin: 1rem auto 4rem;
    text-align: center;

    @media screen and (max-width: 768px) {
      margin: 1rem 2rem 4rem;
    }
  }
}

.dark #amazing-work {
  background: linear-gradient(0deg, rgba(34, 9, 50, 0) 0%, rgba(34, 9, 50, 1) 5%, rgba(34, 9, 50, 1) 80%, rgba(34, 9, 50, 0) 100%);
}

.image-row {
  display: flex;
  margin: 1rem 0 0;
  overflow: hidden;
  scroll-behavior: smooth;
  padding-bottom:1rem;

  img {
    height:400px;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.063) 0px 10px 10px -3.75px;
  }
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &.top {
    animation: scrollRight 320s linear infinite;
  }
  
  &.bottom {
    animation: scrollLeft 320s linear infinite;
  }
}

@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scrollRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

</style>