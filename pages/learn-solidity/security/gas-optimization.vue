<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Gas optimization" tagline="Every computation on Ethereum costs gas. Here's how to write contracts that don't waste it." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Why gas matters</h2>

          <p>Gas is the unit of computation cost on Ethereum. Every opcode the EVM executes costs a specific amount of gas. Users pay gas fees in ETH. Writing inefficient contracts means your users pay more for every interaction — a significant UX and adoption problem in competitive DeFi markets.</p>

          <h2>Storage is the most expensive thing you do</h2>

          <p>Writing to a new storage slot costs 20,000 gas. Updating an existing slot costs 5,000 gas. Reading from storage costs 2,100 gas (cold) or 100 gas (warm). Everything else is relatively cheap. The primary goal of gas optimization is minimizing storage reads and writes.</p>

          <CodeBlock lang="solidity" :code="`// EXPENSIVE: reads storage twice
function inefficient() external {
    uint256 a = myValue + 1;   // reads myValue from storage
    uint256 b = myValue + 2;   // reads myValue again!
    emit Result(a, b);
}

// CHEAP: cache in a local variable (stack/memory)
function efficient() external {
    uint256 cached = myValue;  // one storage read
    uint256 a = cached + 1;   // stack operation
    uint256 b = cached + 2;   // stack operation
    emit Result(a, b);
}`" />

          <h2>Pack storage variables</h2>

          <p>Ethereum storage is organized in 32-byte slots. Multiple small variables that fit in 32 bytes together can be packed into a single slot — one read instead of many.</p>

          <CodeBlock lang="solidity" :code="`// INEFFICIENT: each variable uses a full 32-byte slot (3 slots total)
contract Unpacked {
    uint256 a;  // slot 0
    uint256 b;  // slot 1
    uint256 c;  // slot 2
}

// EFFICIENT: a, b, c all fit in one 32-byte slot
contract Packed {
    uint128 a;  // slot 0 (16 bytes)
    uint64 b;   // slot 0 (8 bytes)
    uint64 c;   // slot 0 (8 bytes)  — same slot as a and b!
}`" />

          <h2>Use calldata instead of memory for read-only params</h2>

          <CodeBlock lang="solidity" :code="`// More expensive: copies data to memory
function processMemory(uint256[] memory data) external pure returns (uint256) { ... }

// Cheaper: reads directly from calldata
function processCalldata(uint256[] calldata data) external pure returns (uint256) { ... }`" />

          <h2>Use custom errors instead of strings</h2>

          <CodeBlock lang="solidity" :code="`// EXPENSIVE: string stored in bytecode
require(amount > 0, 'Amount must be greater than zero');

// CHEAP: custom error — just a 4-byte selector
error AmountIsZero();
if (amount == 0) revert AmountIsZero();`" />

          <h2>Avoid unbounded loops</h2>

          <p>Loops over dynamic arrays are dangerous — both for gas and for DoS attacks. If you must loop, set an upper bound or use pagination.</p>

          <CodeBlock lang="solidity" :code="`// DANGEROUS: could run out of gas if users[] grows large
function payAll() external {
    for (uint256 i = 0; i < users.length; i++) {
        _pay(users[i]);
    }
}

// SAFE: let users pull their own payment
mapping(address => uint256) public pending;
function claim() external {
    uint256 amount = pending[msg.sender];
    pending[msg.sender] = 0;
    _pay(msg.sender, amount);
}`" />

          <h2>Use events instead of storage for historical data</h2>

          <p>If you only need data for off-chain querying (analytics, history), emit it as an event rather than storing it on-chain. Events cost ~375 gas; storage slots cost 20,000 gas for new slots.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/security/access-control-patterns"
    prevText="Access control patterns"
    nextLink="/learn-solidity/defi-patterns/amm-basics"
    nextText="AMM basics"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity gas optimization' })
useSeoMeta({
  title: 'Solidity gas optimization',
  ogTitle: 'Solidity gas optimization',
  description: 'Every computation on Ethereum costs gas. Here\'s how to write contracts that don\'t waste it.',
  ogDescription: 'Every computation on Ethereum costs gas. Here\'s how to write contracts that don\'t waste it.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/security/gas-optimization',
  twitterTitle: 'Solidity gas optimization',
  twitterDescription: 'Every computation on Ethereum costs gas. Here\'s how to write contracts that don\'t waste it.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
