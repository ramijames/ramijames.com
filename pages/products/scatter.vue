<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/scatter/scatter-logo.png" alt="Scatter Logo" class="product-logo">
      <h1 class="hyper-bold">Scatter</h1>
      <h4 class="centered">Web3 Wallet, Digital Identity, and Marketplace</h4>
      <div class="main-product-image scatter" ref="image">
        <img src="/products/scatter/scatter-main-mobile.png" alt="Scatter Mobile">
      </div>
    </section>

    <section class="product-content general-main page-top">
      <aside class="product-role">
        <div class="single-role">
          <h4>Role</h4>
          <p>I was the Head of Product and Co-founder at Scatter. I helped guide the product vision according to the business and market needs. I assisted in implementing the interface in Vue and Electron.</p>
        </div>
        <div class="single-role">
          <h4>Responsibilities</h4>
          <ul class="roles">
            <li>Concept</li>
            <li>Roadmap</li>
            <li>Design</li>
            <li>UI/UX</li>
            <li>Prototyping</li>
            <li>Mockups</li>
            <li>Vue</li>
          </ul>
        </div>
      </aside>
    </section>

    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>About Scatter</h3>
        <p>Scatter was started in 2017 by <a href="https://twitter.com/nsjames_">Nathan James</a> as a way for the EOSIO community to launch its Mainnet. I joined shortly after both as Head of Product and the COO. As with most startups, we all had to wear many hats.</p>
        <p>Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.</p>
        <p>The first standalone application launched in 2018, and was based on the <span class="codehighlight">Vue.js</span> stack embedded in an <span class="codehighlight">Electron</span> app. Throughout 2018 and 2019, we iterated through many versions of the interface with the intense feedback of the quickly growing community of users. At our peak, we had around 150-200K DAU.</p>
      </aside>
    </section>

    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>A complex beast</h3>
        <img src="/products/scatter/scatter-in-progress.png" alt="Scatter In Progress" class="single-product-image">
        <p>The utterly complex nature of the EOS blockchain was often a stumbling block for users, and it became our core challenge to simplify the user experience while still allowing users to interact with the blockchain in a secure way. We had to balance the needs of the power users with the needs of the new users, and it was a constant dance to keep everyone happy. I spent a lot of time tweaking and inventing new interfaces which, for example, made things like on-boarding new users straightforward and understandable.</p>
      </aside>
    </section>

    <img src="/products/scatter/better-on-boarding.png" alt="Scatter improves its on-boarding" class="single-product-image">

    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>Challenges from the ecosystem</h3>
        <p>Our core challenge at Scatter was finding a way to provide enough revenue to support our growing team. At its peak, we had ten people on payroll working on a wide variety of products, including:</p>
        <ul>
          <li><strong>Scatter Desktop</strong> - Our desktop, Electron-based signing wallet.</li>
          <li><strong>Scatter Mobile</strong> - Our mobile native signing wallet, unreleased.</li>
          <li><strong>Scatter JS</strong> - The developer-facing signing library used for integration with our wallet.</li>
          <li><strong>Scatter Marketplace</strong> - The prototype digital products marketplace released in 2019.</li>
          <li><strong>Scatter Identity (RIDL)</strong> - The digital identity network and extension for providing anonymous, verifiable identities on web3.</li>
        </ul>
        <p>We were constantly evolving the product, and it dramatically improved over the two years that we worked on it. It was a lot to manage, and we were always looking for ways to simplify our product offering while still providing value to our users.</p>
      </aside>
    </section>
    
    <img src="/products/scatter/scatter-evolves.png" alt="Scatter evolves" class="single-product-image">

    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>Post-mortem</h3>
        <p>Scatter was a wild ride, and I learned a lot about managing teams, building products in a fast-paced market, and the challenges of building something that is used by a lot of people. <strong>I'm proud of the work that we did</strong>. I'm also deeply saddened that we failed to break out into the wider web3 ecosystems, and ultimately that we had to close things down. I learned much of what I know today by building this startup.</p>
        <p>We shuttered operations in early 2020, and our team largely moved to <nuxt-link to="/products/ultra">Ultra</nuxt-link>, where we continued to build great things together.</p>
      </aside>

    </section>

  </main>
  <MergedProjects />
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