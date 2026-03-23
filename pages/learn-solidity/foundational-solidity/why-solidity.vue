<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Why learn Solidity?" tagline="The language behind billions of dollars of on-chain value — and why it's worth understanding." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Code that runs on a global computer</h2>

          <p>Solidity is a programming language designed for writing smart contracts — programs that run on the Ethereum Virtual Machine (EVM). Unlike traditional software, smart contracts execute on a decentralized network of thousands of nodes, and once deployed, they cannot be changed. Every line of code you write becomes a permanent, publicly verifiable program that anyone can call.</p>

          <p>That's a fundamentally different programming model, and it creates a fundamentally different set of responsibilities.</p>

          <h2>Why bother?</h2>

          <p>Ethereum and EVM-compatible chains (Polygon, Arbitrum, Base, Optimism, etc.) host trillions of dollars of value locked in smart contracts. The tooling, the ecosystem, and the developer community have matured significantly over the past few years. Learning Solidity gives you access to:</p>

          <ul>
            <li>DeFi protocols — lending, borrowing, swapping, yield farming</li>
            <li>NFTs and digital ownership</li>
            <li>DAOs and on-chain governance</li>
            <li>Token standards used across thousands of projects</li>
            <li>Cross-chain bridges and interoperability</li>
          </ul>

          <h2>A real-world reference point</h2>

          <p>Throughout these lessons, we'll reference <a href="https://doodledapp.com" target="_blank" rel="noopener">Doodledapp.com</a> — a production DeFi application built with Solidity — to show how these patterns work in a live, deployed system. Seeing how concepts translate from tutorial code to production contracts is one of the most valuable things you can do as a learner.</p>

          <h2>What you need to know before starting</h2>

          <p>You don't need to know anything about blockchain to start. A basic understanding of programming concepts (variables, functions, loops) is enough. If you've written JavaScript, TypeScript, or Python before, you'll feel at home quickly. Solidity's syntax borrows heavily from C++ and JavaScript.</p>

          <p>What you <em>will</em> need to adjust to is the execution model: there is no database to query, no server to call, no mutable global state in the traditional sense. Storage is expensive. Computation is public. Errors can be permanent.</p>

          <p>Let's get into it.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity"
    prevText="Home"
    nextLink="/learn-solidity/foundational-solidity/setting-up-your-dev-environment"
    nextText="Setting up your dev environment"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Why learn Solidity?' })
useSeoMeta({
  title: 'Why learn Solidity?',
  ogTitle: 'Why learn Solidity?',
  description: 'The language behind billions of dollars of on-chain value — and why it\'s worth understanding.',
  ogDescription: 'The language behind billions of dollars of on-chain value — and why it\'s worth understanding.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/foundational-solidity/why-solidity',
  twitterTitle: 'Why learn Solidity?',
  twitterDescription: 'The language behind billions of dollars of on-chain value — and why it\'s worth understanding.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
