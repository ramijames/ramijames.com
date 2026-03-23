<template>

  <PageHeader title="Learn Solidity" tagline="Build smart contracts and decentralized applications on Ethereum. From zero to production-ready." />

  <main class="w-content page-top">
    <section class="content">

      <h2>About these notes</h2>

      <p>Solidity is the language that powers Ethereum and most of the decentralized applications built on top of it. I've spent considerable time building on-chain, and these notes are a distillation of everything I wish I had known from the start. They cover the language from the ground up, through security, DeFi patterns, and all the way to production deployment.</p>

      <p>Make sure to check out <a href="https://doodledapp.com" target="_blank" rel="noopener">Doodledapp.com</a>, a visual node-based editor for Solidity.</p>

      <LearnSolidityNav :innerNav="false" />

    </section>
  </main>
  <Footer />
</template>

<script setup>

useHead({
  title: 'Learn Solidity'
})

useSeoMeta({
  title: 'Learn Solidity',
  ogTitle: 'Learn Solidity',
  description: 'Build smart contracts and decentralized applications on Ethereum. From zero to production-ready.',
  ogDescription: 'Build smart contracts and decentralized applications on Ethereum. From zero to production-ready.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity',
  twitterTitle: 'Learn Solidity',
  twitterDescription: 'Build smart contracts and decentralized applications on Ethereum. From zero to production-ready.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})

</script>
