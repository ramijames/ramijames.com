<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/random-sandwich/random-sandwich-logo-white.png" alt="Random Sandwich Logo" class="product-logo invert">
      <h1 class="hyper-bold">Random Sandwich</h1>
      <h4 class="centered">Create surprisingly delicious things</h4>
      
      
      <div class="main-product-image sammitch" ref="image">
        <video id="sampleMovie" width="640" height="360" preload autoplay loop>
          <source src="/products/random-sandwich/random-sandwiches.webm" />
        </video>
      </div>
      <section class="product-bar">
        <section class="links">
          <a href="https://github.com/ramijames/RandomSandwich" target="_blank">Github Repo</a>
        </section>
        <section class="buttons">
          <a href="https://random-sandwich.com" target="_blank" class="button">Visit Random Sandwich</a>
        </section>
      </section>
    </section>
    <section class="product-content">
      <h2>The Random Sandwich Story</h2>
      <aside class="story-time">
        <p>I'm obsessed with sandwiches. Most weeks, they are my primary source of "nutrition". Cheese. Bacon. Beef. Eggs. Veggies. You know the drill. Sammitches are excellent.</p>
        <p>At some point the idea of generating random sandwiches wormed its way into my mind, and the playful website random-sandwich.com was born.</p>
        <p>Random Sandwich is a simple, fun project that generates random sandwich ideas. It's a great way to get inspired for your next meal, or just to have a laugh.</p>
        <h3>Tech Stack and Future Features</h3>
        <p>Random Sandwich is built with <span class="codehighlight">Vue.js</span>, <span class="codehighlight">Firebase</span>, and is hosted on <span class="codehighlight">Netlify</span>. The site is a single page application that generates random sandwich ideas using a simple algorithm. Users can currently create accounts, log in, and create randomly generated sandwiches with an assortment of breads, meats, and veggies.</p>

        <p>Future features include the ability to save sandwiches, share sandwiches, and vote on sandwiches.</p>
        
        <p>I'll be extending the other randomly generated components to include avatars, creatures and characters, and much more!</p>
      </aside>

      


    </section>

    <hr>

    <section class="product-content">
      <h2>Illustrations</h2>
      <p class="centered">Random Sandwich includes many custom illustrations which give the application its unique look and character.</p>
    </section>

    <section class="product-images">
      <img src="/products/random-sandwich/protein-eggyolk.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/vegetable-lettuce.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/vegetable-white-onion.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/cheese-cheddar.png" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/bread-rye-brown.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/cheese-swiss.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/protein-roastbeef.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/vegetable-pickles.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/cheese-american.png" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/bread-sourdough.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/vegetable-tomato.svg" alt="" class="single-feature-image">
      <img src="/products/random-sandwich/vegetable-red-onion.svg" alt="" class="single-feature-image">
    </section>

      <hr>

    <section class="product-content">
      <h2>Interface Design</h2>
      <p class="centered">The interface design is intended to be dead simple and mobile friendly.</p>
    </section>
    <section class="product-images">
      <img src="/products/random-sandwich/random-sandwich-register.png" alt="Random Sandwich Register" class="single-product-image">
      <img src="/products/random-sandwich/random-sandwich-home.png" alt="Random Sandwich Home" class="single-product-image">
      <img src="/products/random-sandwich/random-sandwich-login.png" alt="Random Sandwich Login" class="single-product-image">
    </section>
  </main>
  <Footer />
</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue';

let image = ref(null);

onMounted(() => {
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const rotationAngle = Math.max(0, 20 - scrollPosition / 20);
    image.value.style.transform = `rotate3d(1, 0, 0, ${rotationAngle}deg)`;
  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

</script>