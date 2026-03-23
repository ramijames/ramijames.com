<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Control flow" tagline="Conditionals, loops, and error handling — with a focus on the patterns that actually matter in production." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Conditionals</h2>

          <p>Solidity supports standard if/else syntax.</p>

          <CodeBlock lang="solidity" :code="`function classify(uint256 amount) public pure returns (string memory) {
    if (amount == 0) {
        return 'zero';
    } else if (amount < 100) {
        return 'small';
    } else {
        return 'large';
    }
}`" />

          <h2>Loops</h2>

          <p>Solidity supports <code>for</code>, <code>while</code>, and <code>do...while</code> loops.</p>

          <CodeBlock lang="solidity" :code="`function sumArray(uint256[] memory values) public pure returns (uint256 total) {
    for (uint256 i = 0; i < values.length; i++) {
        total += values[i];
    }
}`" />

          <p><strong>Be careful with loops in production contracts.</strong> Each iteration costs gas. If an attacker can make your array unboundedly large, they can cause your function to run out of gas and revert — a denial-of-service attack. Prefer mappings over arrays for large data sets.</p>

          <h2>require, revert, and assert</h2>

          <p>These are Solidity's primary error-handling tools. Getting them right is critical for both security and UX.</p>

          <h3>require</h3>
          <p>The workhorse of input validation. Reverts the transaction with an error message if the condition is false. Any gas spent up to that point is consumed; unused gas is refunded.</p>

          <CodeBlock lang="solidity" :code="`function withdraw(uint256 amount) public {
    require(amount > 0, 'Amount must be positive');
    require(balances[msg.sender] >= amount, 'Insufficient balance');
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}`" />

          <h3>revert</h3>
          <p>Explicitly reverts with a custom error. More flexible than <code>require</code> — useful for complex conditionals or when you want to use custom error types (more gas-efficient than string messages).</p>

          <CodeBlock lang="solidity" :code="`error InsufficientBalance(uint256 requested, uint256 available);

function withdraw(uint256 amount) public {
    if (balances[msg.sender] < amount) {
        revert InsufficientBalance(amount, balances[msg.sender]);
    }
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}`" />

          <h3>assert</h3>
          <p>Used to check for internal invariants — conditions that should <em>never</em> be false if the contract logic is correct. Unlike <code>require</code>, a failed <code>assert</code> consumes all remaining gas. Use it sparingly.</p>

          <CodeBlock lang="solidity" :code="`function split(uint256 total, uint256 a, uint256 b) internal pure {
    assert(a + b == total);  // This should always hold — if not, something is very wrong
}`" />

          <h2>try/catch</h2>

          <p>When calling external contracts, use <code>try/catch</code> to handle failures gracefully without reverting your whole transaction.</p>

          <CodeBlock lang="solidity" :code="`interface IExternalContract {
    function riskyCall() external returns (bool);
}

function safeCall(address target) public returns (bool success) {
    try IExternalContract(target).riskyCall() returns (bool result) {
        return result;
    } catch {
        // External call failed — handle gracefully
        return false;
    }
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/foundational-solidity/functions-and-visibility"
    prevText="Functions and visibility"
    nextLink="/learn-solidity/building-blocks/mappings-and-arrays"
    nextText="Mappings and arrays"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity control flow' })
useSeoMeta({
  title: 'Solidity control flow',
  ogTitle: 'Solidity control flow',
  description: 'Conditionals, loops, and error handling — with a focus on the patterns that actually matter in production.',
  ogDescription: 'Conditionals, loops, and error handling — with a focus on the patterns that actually matter in production.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/foundational-solidity/control-flow',
  twitterTitle: 'Solidity control flow',
  twitterDescription: 'Conditionals, loops, and error handling — with a focus on the patterns that actually matter in production.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
