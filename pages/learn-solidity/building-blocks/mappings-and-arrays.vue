<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Mappings and arrays" tagline="The two primary data structures in Solidity — and when to use each one." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Mappings</h2>

          <p>Mappings are the most important data structure in Solidity. They work like hash maps: given a key, they return a value. All keys default to their zero value — you don't need to initialize them.</p>

          <CodeBlock lang="solidity" :code="`mapping(address => uint256) public balances;
mapping(address => mapping(address => uint256)) public allowances;  // nested mapping`" />

          <p>Mappings cannot be iterated over or returned from functions — they have no notion of "all keys." If you need to track which keys exist, maintain a separate array alongside the mapping.</p>

          <CodeBlock lang="solidity" :code="`mapping(address => uint256) public balances;
address[] public holders;

function _addHolder(address account) internal {
    if (balances[account] == 0) {
        holders.push(account);
    }
}`" />

          <h2>Arrays</h2>

          <p>Arrays come in fixed-size and dynamic variants.</p>

          <CodeBlock lang="solidity" :code="`uint256[5] public fixedArray;          // always 5 elements
uint256[] public dynamicArray;          // can grow or shrink
address[] public whitelist;`" />

          <h3>Common array operations</h3>

          <CodeBlock lang="solidity" :code="`contract ArrayExample {
    uint256[] public values;

    function add(uint256 val) public {
        values.push(val);
    }

    function remove(uint256 index) public {
        // Swap with last element and pop — order-independent removal
        values[index] = values[values.length - 1];
        values.pop();
    }

    function length() public view returns (uint256) {
        return values.length;
    }

    function get(uint256 index) public view returns (uint256) {
        require(index < values.length, 'Out of bounds');
        return values[index];
    }
}`" />

          <h2>Memory arrays</h2>

          <p>Arrays created inside functions with <code>memory</code> are temporary — they don't cost storage gas but must have a fixed size declared at creation.</p>

          <CodeBlock lang="solidity" :code="`function getTopN(uint256 n) public view returns (uint256[] memory) {
    uint256[] memory result = new uint256[](n);
    for (uint256 i = 0; i < n; i++) {
        result[i] = values[i];
    }
    return result;
}`" />

          <h2>Mapping vs. array — when to use which</h2>

          <ul>
            <li>Use a <strong>mapping</strong> when you look up values by key (e.g., user balances, allowances, ownership)</li>
            <li>Use an <strong>array</strong> when you need to iterate or return a list</li>
            <li>Use <strong>both together</strong> when you need both lookup and iteration</li>
          </ul>

          <p>In practice, most ERC-20 token contracts use <code>mapping(address =&gt; uint256)</code> for balances — fast O(1) lookup at the cost of no native iteration.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/foundational-solidity/control-flow"
    prevText="Control flow"
    nextLink="/learn-solidity/building-blocks/structs-and-enums"
    nextText="Structs and enums"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity mappings and arrays' })
useSeoMeta({
  title: 'Solidity mappings and arrays',
  ogTitle: 'Solidity mappings and arrays',
  description: 'The two primary data structures in Solidity — and when to use each one.',
  ogDescription: 'The two primary data structures in Solidity — and when to use each one.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/building-blocks/mappings-and-arrays',
  twitterTitle: 'Solidity mappings and arrays',
  twitterDescription: 'The two primary data structures in Solidity — and when to use each one.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
