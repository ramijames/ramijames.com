<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Modifiers" tagline="Reusable pre- and post-conditions that wrap your functions. The building block of access control." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is a modifier?</h2>

          <p>A modifier is a piece of code that runs before (or after) a function executes. They're used to enforce preconditions — checks that must pass before the function body runs. The <code>_;</code> placeholder marks where the function body is inserted.</p>

          <CodeBlock lang="solidity" :code="`modifier onlyOwner() {
    require(msg.sender == owner, 'Not the owner');
    _;  // the function body runs here
}

function setFee(uint256 newFee) external onlyOwner {
    fee = newFee;
    // onlyOwner check runs first — if msg.sender != owner, it reverts before reaching here
}`" />

          <h2>Parameterized modifiers</h2>

          <p>Modifiers can accept parameters, making them flexible enough to handle varying conditions.</p>

          <CodeBlock lang="solidity" :code="`modifier minimumAmount(uint256 min) {
    require(msg.value >= min, 'Insufficient ETH sent');
    _;
}

function premiumMint() external payable minimumAmount(0.1 ether) {
    _mint(msg.sender, 1);
}`" />

          <h2>Multiple modifiers</h2>

          <p>Functions can have multiple modifiers. They execute left to right, each waiting for the previous one to place its <code>_;</code>.</p>

          <CodeBlock lang="solidity" :code="`modifier onlyOwner() {
    require(msg.sender == owner, 'Not owner');
    _;
}

modifier whenNotPaused() {
    require(!paused, 'Contract is paused');
    _;
}

function withdraw(uint256 amount) external onlyOwner whenNotPaused {
    // Runs: onlyOwner check → whenNotPaused check → function body
    payable(msg.sender).transfer(amount);
}`" />

          <h2>Post-condition modifiers</h2>

          <p>Code after <code>_;</code> runs after the function body. This is less common but useful for invariant checks.</p>

          <CodeBlock lang="solidity" :code="`modifier checkInvariant() {
    _;
    // Runs after the function body
    assert(totalSupply == _sumOfBalances());
}

function mint(address to, uint256 amount) internal checkInvariant {
    balances[to] += amount;
    totalSupply += amount;
}`" />

          <h2>Common modifier patterns</h2>

          <ul>
            <li><code>onlyOwner</code> — Restrict to contract owner</li>
            <li><code>whenNotPaused</code> / <code>whenPaused</code> — Emergency circuit breaker</li>
            <li><code>nonReentrant</code> — Prevent reentrancy attacks (OpenZeppelin's most-used modifier)</li>
            <li><code>onlyRole(role)</code> — Role-based access control</li>
          </ul>

          <p>Rather than reinventing these, prefer OpenZeppelin's battle-tested implementations:</p>

          <CodeBlock lang="solidity" :code="`import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

contract MyContract is Ownable, ReentrancyGuard {
    function sensitiveAction() external onlyOwner nonReentrant {
        // ...
    }
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/building-blocks/events-and-logging"
    prevText="Events and logging"
    nextLink="/learn-solidity/building-blocks/inheritance-and-abstract-contracts"
    nextText="Inheritance and abstract contracts"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity modifiers' })
useSeoMeta({
  title: 'Solidity modifiers',
  ogTitle: 'Solidity modifiers',
  description: 'Reusable pre- and post-conditions that wrap your functions. The building block of access control.',
  ogDescription: 'Reusable pre- and post-conditions that wrap your functions. The building block of access control.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/building-blocks/modifiers',
  twitterTitle: 'Solidity modifiers',
  twitterDescription: 'Reusable pre- and post-conditions that wrap your functions. The building block of access control.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
