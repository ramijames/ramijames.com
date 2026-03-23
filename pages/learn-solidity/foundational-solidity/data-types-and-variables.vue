<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Data types and variables" tagline="Solidity's type system is strict and storage-aware. Here's what you need to know." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Value types</h2>

          <p>Value types are copied when assigned or passed to functions. They live entirely in the variable — no pointer magic.</p>

          <h3>Integers</h3>

          <CodeBlock lang="solidity" :code="`uint8 small = 255;       // unsigned, 8-bit (0 to 255)
uint256 big = 1e18;      // unsigned, 256-bit (most common)
int256 signed = -100;    // signed integer`" />

          <p>Integer overflow and underflow were historically a major bug source. Since Solidity 0.8.0, arithmetic reverts on overflow by default — no need for SafeMath.</p>

          <h3>Booleans</h3>

          <CodeBlock lang="solidity" :code="`bool isActive = true;
bool hasVoted = false;`" />

          <h3>Addresses</h3>

          <p>An <code>address</code> holds a 20-byte Ethereum address. <code>address payable</code> can receive Ether.</p>

          <CodeBlock lang="solidity" :code="`address owner = 0xAbCd...;
address payable treasury = payable(0xAbCd...);`" />

          <h3>Bytes and strings</h3>

          <CodeBlock lang="solidity" :code="`bytes32 hash = keccak256(abi.encodePacked('hello'));
string name = 'Doodledapp';  // dynamic size, stored in memory or storage`" />

          <p>Prefer <code>bytes32</code> over <code>string</code> for fixed-size identifiers — it's cheaper to store and compare.</p>

          <h2>Reference types</h2>

          <p>Reference types — arrays, structs, mappings, and strings — don't copy their data on assignment. You must specify a data location: <code>storage</code>, <code>memory</code>, or <code>calldata</code>.</p>

          <CodeBlock lang="solidity" :code="`// storage: persisted on-chain
uint256[] public storedNumbers;

// memory: temporary, exists only during the function call
function process(uint256[] memory input) public pure returns (uint256) {
    return input.length;
}

// calldata: read-only, for external function parameters
function processCalldata(uint256[] calldata input) external pure returns (uint256) {
    return input.length;
}`" />

          <h2>State vs. local variables</h2>

          <p>State variables are declared at the contract level. They persist between transactions and cost gas to write. Local variables (declared inside functions) live only for the duration of the call.</p>

          <CodeBlock lang="solidity" :code="`contract Example {
    uint256 public counter;   // state variable — stored on-chain

    function increment() public {
        uint256 temp = counter + 1;  // local variable — in memory
        counter = temp;              // write to state — costs gas
    }
}`" />

          <h2>Constants and immutables</h2>

          <p>For values that don't change, <code>constant</code> and <code>immutable</code> save significant gas because they're inlined at compile time or set once at deployment.</p>

          <CodeBlock lang="solidity" :code="`contract Token {
    uint256 public constant MAX_SUPPLY = 1_000_000 * 1e18;  // compile-time constant
    address public immutable deployer;                        // set once in constructor

    constructor() {
        deployer = msg.sender;
    }
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/foundational-solidity/your-first-contract"
    prevText="Your first contract"
    nextLink="/learn-solidity/foundational-solidity/functions-and-visibility"
    nextText="Functions and visibility"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity data types and variables' })
useSeoMeta({
  title: 'Solidity data types and variables',
  ogTitle: 'Solidity data types and variables',
  description: "Solidity's type system is strict and storage-aware. Here's what you need to know.",
  ogDescription: "Solidity's type system is strict and storage-aware. Here's what you need to know.",
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/foundational-solidity/data-types-and-variables',
  twitterTitle: 'Solidity data types and variables',
  twitterDescription: "Solidity's type system is strict and storage-aware. Here's what you need to know.",
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
