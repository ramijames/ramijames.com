<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Auditing your contracts" tagline="What an audit is, what it isn't, and how to prepare your code to get the most out of one." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is a smart contract audit?</h2>

          <p>An audit is a structured security review of your contract code by one or more external experts. Auditors look for vulnerabilities, logic errors, gas inefficiencies, and deviation from intended behavior. A clean audit from a reputable firm is a significant trust signal in DeFi — but it's not a guarantee of safety. Audits are snapshots, not ongoing protection.</p>

          <h2>Do you need an audit?</h2>

          <p>If your contract will hold real value — any amount — get an audit. The cost of an audit (typically $10k–$100k+ depending on firm and scope) is trivial compared to the cost of a hack. Notable hacks like Ronin Bridge ($625M), Wormhole ($320M), and many others were unaudited or had audit recommendations ignored.</p>

          <h2>Automated tools (use before an audit)</h2>

          <h3>Slither</h3>
          <p>The most widely used static analysis tool for Solidity. Catches common issues automatically.</p>

          <CodeBlock lang="bash" :code="`pip install slither-analyzer
slither .`" />

          <h3>Mythril</h3>
          <p>Symbolic execution tool that finds deeper logic vulnerabilities.</p>

          <CodeBlock lang="bash" :code="`pip install mythril
myth analyze contracts/MyContract.sol`" />

          <h3>Aderyn</h3>
          <p>A newer Rust-based static analyzer from Cyfrin, fast and Foundry-compatible.</p>

          <CodeBlock lang="bash" :code="`cargo install aderyn
aderyn .`" />

          <h2>How to prepare for an audit</h2>

          <ul>
            <li><strong>Write comprehensive tests</strong> — Auditors review test coverage. Gaps in coverage are red flags.</li>
            <li><strong>Add NatSpec documentation</strong> — Document every function's intent, parameters, and return values.</li>
            <li><strong>Run automated tools first</strong> — Fix everything Slither/Mythril flag before the audit. Don't waste auditor time on known issues.</li>
            <li><strong>Write a threat model</strong> — What can go wrong? Who are the actors? What are the trust assumptions? This guides the auditor's focus.</li>
            <li><strong>Freeze the code</strong> — Don't change the codebase during the audit.</li>
          </ul>

          <h2>NatSpec documentation</h2>

          <CodeBlock lang="solidity" :code="`/// @title MyProtocol Vault
/// @notice Accepts ERC-20 deposits and issues yield-bearing shares
/// @dev Implements ERC-4626 tokenized vault standard
contract MyVault {

    /// @notice Deposit tokens and receive shares
    /// @param assets Amount of underlying token to deposit
    /// @param receiver Address that receives the shares
    /// @return shares Number of shares minted
    function deposit(uint256 assets, address receiver) external returns (uint256 shares) {
        // ...
    }
}`" />

          <h2>Reputable audit firms</h2>

          <ul>
            <li>Trail of Bits</li>
            <li>OpenZeppelin (audits separate from their library)</li>
            <li>Cyfrin</li>
            <li>Sherlock (competitive audit platform)</li>
            <li>Code4rena (competitive audit platform)</li>
          </ul>

          <p>Competitive audit platforms (Sherlock, Code4rena) are a cost-effective option for projects that can't afford a full traditional audit — many independent auditors review your code simultaneously for a prize pool.</p>

          <h2>After the audit</h2>

          <p>Address every finding. Publish the audit report publicly — transparency is expected in DeFi. If you deployed unverified or without an audit and found a bug, use an emergency pause mechanism immediately and engage a recovery team before the exploit is replicated.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/production/connecting-to-frontends"
    prevText="Connecting to frontends"
    nextLink="/learn-solidity"
    nextText="Back to course overview"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Auditing your Solidity contracts' })
useSeoMeta({
  title: 'Auditing your Solidity contracts',
  ogTitle: 'Auditing your Solidity contracts',
  description: 'What an audit is, what it isn\'t, and how to prepare your code to get the most out of one.',
  ogDescription: 'What an audit is, what it isn\'t, and how to prepare your code to get the most out of one.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/production/auditing-your-contracts',
  twitterTitle: 'Auditing your Solidity contracts',
  twitterDescription: 'What an audit is, what it isn\'t, and how to prepare your code to get the most out of one.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
