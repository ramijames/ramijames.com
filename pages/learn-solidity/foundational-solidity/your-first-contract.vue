<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Your first contract" tagline="Write, compile, and deploy a simple smart contract — and understand what every line does." />

      <main class="w-content page-top">
        <section class="content">

          <h2>The anatomy of a Solidity file</h2>

          <p>Every Solidity file starts with a license identifier and a pragma statement that tells the compiler which version to use.</p>

          <CodeBlock lang="solidity" :code="`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    function store(uint256 value) public {
        storedValue = value;
    }

    function retrieve() public view returns (uint256) {
        return storedValue;
    }
}`" />

          <p>Let's walk through each part.</p>

          <h3>SPDX license identifier</h3>
          <p>This is a machine-readable license tag. <code>MIT</code> is common for open-source contracts. Omitting it produces a compiler warning.</p>

          <h3>pragma solidity</h3>
          <p>This pins the compiler version. The <code>^</code> means "this version or any compatible minor version." Using <code>^0.8.20</code> allows <code>0.8.20</code>, <code>0.8.21</code>, etc., but not <code>0.9.x</code>.</p>

          <h3>contract</h3>
          <p>The <code>contract</code> keyword declares a new contract — similar to a class in object-oriented languages. The name should match the filename.</p>

          <h3>State variables</h3>
          <p><code>uint256 private storedValue</code> declares a state variable. State variables are stored permanently on the blockchain. Reading them costs no gas; writing to them does.</p>

          <h3>Functions</h3>
          <p>The <code>store</code> function writes to state (costs gas). The <code>retrieve</code> function is marked <code>view</code> — it only reads state and is free to call.</p>

          <h2>Deploy to a local node</h2>

          <p>With your Hardhat node running (<code>npx hardhat node</code>), create an Ignition module to deploy:</p>

          <CodeBlock lang="javascript" :code="`// ignition/modules/SimpleStorage.js
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('SimpleStorageModule', (m) => {
  const simpleStorage = m.contract('SimpleStorage');
  return { simpleStorage };
});`" />

          <CodeBlock lang="bash" :code="`npx hardhat ignition deploy ignition/modules/SimpleStorage.js --network localhost`" />

          <h2>Interact with your contract</h2>

          <p>Open a Hardhat console and call your contract directly:</p>

          <CodeBlock lang="bash" :code="`npx hardhat console --network localhost`" />

          <CodeBlock lang="javascript" :code="`const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
const deployed = await SimpleStorage.attach('YOUR_CONTRACT_ADDRESS');

// Store a value
await deployed.store(42);

// Read it back
const val = await deployed.retrieve();
console.log(val.toString()); // 42`" />

          <p>That's your first deployed, called smart contract. From here, every concept builds on this foundation.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/foundational-solidity/setting-up-your-dev-environment"
    prevText="Setting up your dev environment"
    nextLink="/learn-solidity/foundational-solidity/data-types-and-variables"
    nextText="Data types and variables"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Your first Solidity contract' })
useSeoMeta({
  title: 'Your first Solidity contract',
  ogTitle: 'Your first Solidity contract',
  description: 'Write, compile, and deploy a simple smart contract — and understand what every line does.',
  ogDescription: 'Write, compile, and deploy a simple smart contract — and understand what every line does.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/foundational-solidity/your-first-contract',
  twitterTitle: 'Your first Solidity contract',
  twitterDescription: 'Write, compile, and deploy a simple smart contract — and understand what every line does.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
