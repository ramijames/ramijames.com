<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/doodledapp/doodledapp-logo.svg" alt="Doodledapp Logo" class="product-logo">
      <h1 class="hyper-bold">Doodledapp</h1>
      <h4 class="centered">No-code smart contract development, deployment, and component marketplace</h4>
      
      <div class="main-product-image doodledapp" ref="image">
        <img src="/products/doodledapp/flow.png" alt="Doodledapp">
      </div>
      
    </section>
    <section class="product-content">
      <aside class="story-time">
        <p>The product vision of Doodledapp was to allow anyone to create and deploy smart contracts to public networks quickly and easily. These smart contracts should be built up from components, all within a no-code editor, in your browser.</p>
        <p>The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.</p>

        <p>Following this, we intended to allow users to sell these components on an open marketplace, while also providing adjacent services such as security auditing and peer reviews.</p>

        <img src="/products/doodledapp/contract-function-single.png" alt="Early Doodledapp" class="single-product-image">

        <p>Project Management within the application was robust, and allowed users to create and manage multiple contracts per project.</p>

        <img src="/products/doodledapp/firstproject.png" alt="Doodledapp Project Management" class="single-product-image">

        <p>Critical to the product was the ability to deploy the contracts to a network. We wanted to make this as simple as possible, and so we built a deployment tool that allowed users to test and then deploy their contracts to a network of their choice with a single click.</p> 

        <img src="/products/doodledapp/deploy.png" alt="Doodledapp Deployment" class="single-product-image">
        
      </aside>
    </section>

    <section class="product-content">
      <aside class="story-time">

        <p>As we developed the Doodledapp product, we quickly understood that the scope of what was envisioned out-stripped our available funding. With some deep discussions within the team, we made the difficult decision to pause the project.</p>

        <p>The Doodledapp project is currently in stasis. If you're interested in funding its continued development, <a href="mailto:ramijames@gmail.com">please reach out</a>.</p>

      </aside>

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