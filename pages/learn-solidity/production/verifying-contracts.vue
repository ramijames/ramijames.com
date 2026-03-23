<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Verifying contracts" tagline="Make your contract source code publicly readable on Etherscan — the single most important trust signal in DeFi." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Why verify?</h2>

          <p>An unverified contract on Etherscan shows only raw bytecode — unreadable to humans. A verified contract shows the full Solidity source code, the ABI, and allows anyone to call functions directly from Etherscan's UI. In DeFi, verification is a baseline trust requirement. Sophisticated users and protocols will not interact with unverified contracts.</p>

          <h2>Verify with Hardhat</h2>

          <p>With the <code>@nomicfoundation/hardhat-verify</code> plugin (included in hardhat-toolbox) and an Etherscan API key, verification is a single command.</p>

          <CodeBlock lang="bash" :code="`# Verify a contract with no constructor arguments
npx hardhat verify --network sepolia CONTRACT_ADDRESS

# Verify a contract with constructor arguments
npx hardhat verify --network sepolia CONTRACT_ADDRESS 'arg1' 'arg2'`" />

          <p>If your constructor takes complex arguments (arrays, structs), use a constructor arguments file:</p>

          <CodeBlock lang="javascript" :code="`// arguments.js
module.exports = [
  'Token Name',
  'TKN',
  1000000,  // initial supply
];`" />

          <CodeBlock lang="bash" :code="`npx hardhat verify --network sepolia CONTRACT_ADDRESS --constructor-args arguments.js`" />

          <h2>Verify with Ignition</h2>

          <p>Hardhat Ignition can verify contracts automatically after deployment:</p>

          <CodeBlock lang="bash" :code="`npx hardhat ignition deploy ignition/modules/MyToken.js \\
  --network sepolia \\
  --verify`" />

          <h2>Verify on multiple chains</h2>

          <p>If you deploy to multiple EVM chains, each has its own block explorer. Configure each in <code>hardhat.config.js</code>:</p>

          <CodeBlock lang="javascript" :code="`etherscan: {
  apiKey: {
    mainnet: process.env.ETHERSCAN_API_KEY,
    sepolia: process.env.ETHERSCAN_API_KEY,
    polygon: process.env.POLYGONSCAN_API_KEY,
    arbitrumOne: process.env.ARBISCAN_API_KEY,
    base: process.env.BASESCAN_API_KEY,
  }
}`" />

          <h2>After verification</h2>

          <p>Once verified, Etherscan shows:</p>
          <ul>
            <li>Full source code with syntax highlighting</li>
            <li>Read contract tab — call any view function directly</li>
            <li>Write contract tab — call state-changing functions (requires wallet connection)</li>
            <li>ABI for developers integrating with your contract</li>
          </ul>

          <p>Share the Etherscan link publicly. It's your contract's public profile.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/production/deploying-to-testnet"
    prevText="Deploying to testnet"
    nextLink="/learn-solidity/production/connecting-to-frontends"
    nextText="Connecting to frontends"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Verifying Solidity contracts on Etherscan' })
useSeoMeta({
  title: 'Verifying Solidity contracts on Etherscan',
  ogTitle: 'Verifying Solidity contracts on Etherscan',
  description: 'Make your contract source code publicly readable on Etherscan — the single most important trust signal in DeFi.',
  ogDescription: 'Make your contract source code publicly readable on Etherscan — the single most important trust signal in DeFi.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/production/verifying-contracts',
  twitterTitle: 'Verifying Solidity contracts on Etherscan',
  twitterDescription: 'The single most important trust signal in DeFi.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
