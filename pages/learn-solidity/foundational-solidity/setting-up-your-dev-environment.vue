<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Setting up your dev environment" tagline="Get Hardhat, a local node, and VS Code configured so you can write and test contracts locally." />

      <main class="w-content page-top">
        <section class="content">

          <h2>The tools you need</h2>

          <p>The Solidity development ecosystem has standardized around a few core tools. You'll need Node.js, a package manager (npm or yarn), and one of two frameworks: Hardhat or Foundry. These notes use Hardhat because it's JavaScript-first and easier to integrate with frontend tooling.</p>

          <h2>Install Node.js</h2>

          <p>Use nvm (Node Version Manager) to install and manage Node.js versions. This gives you flexibility when different projects need different versions.</p>

          <CodeBlock lang="bash" :code="`# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20`" />

          <h2>Create a Hardhat project</h2>

          <p>Hardhat is the most widely used Solidity development framework. It handles compilation, testing, local node simulation, and deployment scripts.</p>

          <CodeBlock lang="bash" :code="`mkdir my-solidity-project
cd my-solidity-project
npm init -y
npm install --save-dev hardhat

# Initialize Hardhat
npx hardhat init`" />

          <p>When prompted, choose "Create a JavaScript project" (or TypeScript if you prefer). Hardhat will scaffold the following structure:</p>

          <CodeBlock lang="bash" :code="`my-solidity-project/
├── contracts/          # Your .sol files go here
├── ignition/modules/   # Deployment scripts
├── test/               # Test files (Mocha + Chai)
├── hardhat.config.js   # Configuration
└── package.json`" />

          <h2>Install the Solidity VS Code extension</h2>

          <p>The official Solidity extension for VS Code (by Nomic Foundation, the team behind Hardhat) gives you syntax highlighting, inline error checking, and go-to-definition support.</p>

          <p>Open VS Code, go to Extensions, search for "Solidity" and install the one by Nomic Foundation.</p>

          <h2>Compile your first contract</h2>

          <p>Hardhat ships with a sample contract. To compile it, run:</p>

          <CodeBlock lang="bash" :code="`npx hardhat compile`" />

          <p>You'll see output confirming the contract compiled successfully. The compiled artifacts (ABI + bytecode) land in the <code>artifacts/</code> directory.</p>

          <h2>Run a local node</h2>

          <p>Hardhat includes a built-in Ethereum node for local development. It starts with 20 pre-funded accounts and fast block times.</p>

          <CodeBlock lang="bash" :code="`npx hardhat node`" />

          <p>Keep this running in a terminal tab while you develop. You can deploy contracts and send transactions to it without spending real ETH.</p>

          <h2>Run the tests</h2>

          <CodeBlock lang="bash" :code="`npx hardhat test`" />

          <p>You're ready. Let's write some contracts.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/foundational-solidity/why-solidity"
    prevText="Why Solidity?"
    nextLink="/learn-solidity/foundational-solidity/your-first-contract"
    nextText="Your first contract"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Setting up your Solidity dev environment' })
useSeoMeta({
  title: 'Setting up your Solidity dev environment',
  ogTitle: 'Setting up your Solidity dev environment',
  description: 'Get Hardhat, a local node, and VS Code configured so you can write and test contracts locally.',
  ogDescription: 'Get Hardhat, a local node, and VS Code configured so you can write and test contracts locally.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/foundational-solidity/setting-up-your-dev-environment',
  twitterTitle: 'Setting up your Solidity dev environment',
  twitterDescription: 'Get Hardhat, a local node, and VS Code configured so you can write and test contracts locally.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
