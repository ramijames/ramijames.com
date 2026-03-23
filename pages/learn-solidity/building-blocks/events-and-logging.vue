<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Events and logging" tagline="Events are how your contract communicates with the outside world — and they're cheaper than storage." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What are events?</h2>

          <p>Events are a way for contracts to emit structured logs to the Ethereum transaction receipt. They don't live in contract storage — they're written to the transaction log, which is much cheaper. Frontends and indexers listen for events to update their state.</p>

          <CodeBlock lang="solidity" :code="`event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);`" />

          <p>The <code>indexed</code> keyword marks a parameter as searchable (filterable). You can have up to 3 indexed parameters per event. Non-indexed parameters are encoded in the log data and are cheaper but not filterable.</p>

          <h2>Emitting events</h2>

          <CodeBlock lang="solidity" :code="`function transfer(address to, uint256 amount) public returns (bool) {
    require(balances[msg.sender] >= amount, 'Insufficient balance');
    balances[msg.sender] -= amount;
    balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
}`" />

          <h2>Listening to events on the frontend</h2>

          <p>With ethers.js, you can listen for events in real-time or query historical events.</p>

          <CodeBlock lang="javascript" :code="eventListenerCode" />

          <h2>Indexed vs. non-indexed</h2>

          <CodeBlock lang="solidity" :code="`// Good: addresses are indexed for filtering, amount is not (just data)
event Swap(
    address indexed sender,
    address indexed tokenIn,
    address indexed tokenOut,
    uint256 amountIn,     // not indexed — just data
    uint256 amountOut     // not indexed — just data
);`" />

          <p>Index fields you'll want to filter by — typically addresses and IDs. Large data values like amounts are better left non-indexed.</p>

          <h2>Events as an audit trail</h2>

          <p>In production DeFi applications, events form the authoritative audit trail. Every significant state change should emit an event. This is how block explorers, analytics dashboards, and indexers (like The Graph) reconstruct contract history. A contract with no events is effectively a black box to everyone outside the chain.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/building-blocks/structs-and-enums"
    prevText="Structs and enums"
    nextLink="/learn-solidity/building-blocks/modifiers"
    nextText="Modifiers"
  />

  <Footer />
</template>

<script setup>
const eventListenerCode = `// Listen for new Transfer events
contract.on('Transfer', (from, to, value) => {
  console.log('Transfer: ' + from + ' -> ' + to + ': ' + ethers.formatEther(value) + ' tokens');
});

// Query historical Transfer events
const filter = contract.filters.Transfer(null, userAddress);
const events = await contract.queryFilter(filter, fromBlock, toBlock);`

useHead({ title: 'Solidity events and logging' })
useSeoMeta({
  title: 'Solidity events and logging',
  ogTitle: 'Solidity events and logging',
  description: 'Events are how your contract communicates with the outside world — and they\'re cheaper than storage.',
  ogDescription: 'Events are how your contract communicates with the outside world — and they\'re cheaper than storage.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/building-blocks/events-and-logging',
  twitterTitle: 'Solidity events and logging',
  twitterDescription: 'Events are how your contract communicates with the outside world — and they\'re cheaper than storage.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
