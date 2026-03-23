<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Common vulnerabilities" tagline="Smart contract bugs are permanent and often catastrophic. Know the attack surface before you deploy." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Why security is different on-chain</h2>

          <p>Traditional software bugs can be patched with a hotfix. Smart contracts are immutable — once deployed, the code runs forever exactly as written. A single bug can drain all funds in the contract in one transaction, and there's no rollback. This is why security isn't a final step — it's woven into every decision you make while writing Solidity.</p>

          <h2>The most common vulnerability classes</h2>

          <h3>1. Reentrancy</h3>

          <p>A contract makes an external call before updating its own state. The external contract calls back into the original function before the state is updated, allowing repeated withdrawals.</p>

          <p>This is covered in depth in the <nuxt-link to="/learn-solidity/security/reentrancy-attacks">Reentrancy Attacks</nuxt-link> lesson.</p>

          <h3>2. Integer overflow and underflow</h3>

          <p>Before Solidity 0.8.0, arithmetic could silently wrap around. This is now handled automatically, but you'll encounter pre-0.8 contracts and patterns in the wild.</p>

          <CodeBlock lang="solidity" :code="`// Solidity < 0.8: this would silently overflow to 0
uint8 x = 255;
x += 1;  // x = 0 (silently!)

// Solidity >= 0.8: reverts with panic code 0x11
uint8 x = 255;
x += 1;  // reverts`" />

          <h3>3. Access control failures</h3>

          <p>Missing or incorrect visibility modifiers leave admin functions callable by anyone.</p>

          <CodeBlock lang="solidity" :code="`// VULNERABLE: no access control
function setOwner(address newOwner) public {
    owner = newOwner;  // anyone can call this!
}

// SAFE:
function setOwner(address newOwner) public onlyOwner {
    owner = newOwner;
}`" />

          <h3>4. Unchecked return values</h3>

          <p>Some older tokens return <code>false</code> on failure instead of reverting. If you don't check the return value, you'll think the transfer succeeded when it didn't.</p>

          <CodeBlock lang="solidity" :code="`// VULNERABLE: assumes success
token.transfer(to, amount);

// SAFE: use SafeERC20 from OpenZeppelin
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
using SafeERC20 for IERC20;
token.safeTransfer(to, amount);  // reverts if transfer fails`" />

          <h3>5. Front-running</h3>

          <p>Transactions are visible in the mempool before they're included in a block. Bots can observe a pending transaction and place their own transaction with higher gas to execute first — extracting value (MEV).</p>

          <h3>6. Oracle manipulation</h3>

          <p>Contracts that rely on on-chain prices (e.g., a single DEX pool as a price oracle) can be manipulated via flash loans within a single transaction.</p>

          <h2>The security mindset</h2>

          <ul>
            <li>Assume all inputs are hostile</li>
            <li>Checks-Effects-Interactions pattern: validate first, update state second, make external calls last</li>
            <li>Use well-audited libraries (OpenZeppelin) instead of rolling your own</li>
            <li>Get an audit before deploying anything with real value</li>
            <li>Write comprehensive tests including attack scenarios</li>
          </ul>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/working-with-ether/the-erc721-nft-standard"
    prevText="The ERC-721 NFT standard"
    nextLink="/learn-solidity/security/reentrancy-attacks"
    nextText="Reentrancy attacks"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Common Solidity vulnerabilities' })
useSeoMeta({
  title: 'Common Solidity vulnerabilities',
  ogTitle: 'Common Solidity vulnerabilities',
  description: 'Smart contract bugs are permanent and often catastrophic. Know the attack surface before you deploy.',
  ogDescription: 'Smart contract bugs are permanent and often catastrophic. Know the attack surface before you deploy.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/security/common-vulnerabilities',
  twitterTitle: 'Common Solidity vulnerabilities',
  twitterDescription: 'Smart contract bugs are permanent and often catastrophic.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
