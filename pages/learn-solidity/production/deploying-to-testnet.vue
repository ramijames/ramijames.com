<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Deploying to testnet" tagline="Get your contract running on Sepolia — the Ethereum testnet that mirrors mainnet without real ETH at stake." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Why testnet first?</h2>

          <p>Testnets let you deploy and interact with contracts in a real EVM environment without using real ETH. Sepolia is the primary Ethereum testnet as of 2024 — it has a faucet, full tooling support, and mirrors mainnet behavior closely.</p>

          <h2>Configure Hardhat for Sepolia</h2>

          <CodeBlock lang="javascript" :code="`// hardhat.config.js
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: '0.8.20',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,       // Alchemy or Infura RPC URL
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};`" />

          <CodeBlock lang="bash" :code="`# .env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
DEPLOYER_PRIVATE_KEY=0x...
ETHERSCAN_API_KEY=YOUR_KEY`" />

          <p><strong>Never commit your .env file.</strong> Add it to <code>.gitignore</code> immediately.</p>

          <h2>Get Sepolia ETH</h2>

          <p>Use a faucet to get test ETH:</p>
          <ul>
            <li>Alchemy Sepolia Faucet</li>
            <li>Chainlink Faucet</li>
            <li>Infura Sepolia Faucet</li>
          </ul>

          <h2>Write an Ignition deployment module</h2>

          <CodeBlock lang="javascript" :code="`// ignition/modules/MyToken.js
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('MyTokenModule', (m) => {
  const myToken = m.contract('MyToken');
  return { myToken };
});`" />

          <h2>Deploy</h2>

          <CodeBlock lang="bash" :code="`npx hardhat ignition deploy ignition/modules/MyToken.js --network sepolia`" />

          <p>Hardhat will output the deployed contract address. Save it — you'll need it to verify and interact with the contract.</p>

          <h2>Confirm on Etherscan</h2>

          <p>Paste your contract address into <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener">sepolia.etherscan.io</a> to see the deployment transaction, bytecode, and any interactions.</p>

          <h2>Test thoroughly on testnet before mainnet</h2>

          <p>Run every function you intend to expose. Test edge cases. Test with multiple accounts. Test failure conditions. The cost of a bug on mainnet is real money and reputational damage — the cost on testnet is nothing.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/defi-patterns/token-swaps"
    prevText="Token swaps"
    nextLink="/learn-solidity/production/verifying-contracts"
    nextText="Verifying contracts"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Deploying Solidity contracts to testnet' })
useSeoMeta({
  title: 'Deploying Solidity contracts to testnet',
  ogTitle: 'Deploying Solidity contracts to testnet',
  description: 'Get your contract running on Sepolia — the Ethereum testnet that mirrors mainnet without real ETH at stake.',
  ogDescription: 'Get your contract running on Sepolia — the Ethereum testnet that mirrors mainnet without real ETH at stake.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/production/deploying-to-testnet',
  twitterTitle: 'Deploying Solidity contracts to testnet',
  twitterDescription: 'Get your contract running on Sepolia without real ETH at stake.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
