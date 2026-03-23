<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Structs and enums" tagline="Group related data with structs. Represent state machines with enums." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Structs</h2>

          <p>Structs let you group related data into a single named type — essential for anything more complex than a single value per address.</p>

          <CodeBlock lang="solidity" :code="`struct Position {
    uint256 amount;        // Token amount deposited
    uint256 entryPrice;    // Price at deposit time
    uint256 timestamp;     // When the position was opened
    address owner;
}

mapping(uint256 => Position) public positions;
uint256 public nextPositionId;

function openPosition(uint256 amount, uint256 price) external returns (uint256 id) {
    id = nextPositionId++;
    positions[id] = Position({
        amount: amount,
        entryPrice: price,
        timestamp: block.timestamp,
        owner: msg.sender
    });
}`" />

          <h3>Structs in memory vs. storage</h3>

          <p>When you read a struct from storage and plan to modify it, use a <code>storage</code> reference to avoid copying.</p>

          <CodeBlock lang="solidity" :code="`// Efficient: modifies storage in-place
function updateAmount(uint256 id, uint256 newAmount) external {
    Position storage pos = positions[id];
    require(pos.owner == msg.sender, 'Not owner');
    pos.amount = newAmount;
}

// Inefficient: copies entire struct to memory just to read one field
function getAmount(uint256 id) external view returns (uint256) {
    Position memory pos = positions[id];  // full copy
    return pos.amount;
    // Better: return positions[id].amount;
}`" />

          <h2>Enums</h2>

          <p>Enums define a fixed set of named states. Under the hood they're stored as <code>uint8</code> values. They make state-machine logic readable and less error-prone than using raw integers.</p>

          <CodeBlock lang="solidity" :code="`enum OrderStatus { Pending, Filled, Cancelled, Expired }

struct Order {
    address maker;
    uint256 amount;
    OrderStatus status;
}

mapping(uint256 => Order) public orders;

function cancelOrder(uint256 orderId) external {
    Order storage order = orders[orderId];
    require(order.maker == msg.sender, 'Not maker');
    require(order.status == OrderStatus.Pending, 'Cannot cancel');
    order.status = OrderStatus.Cancelled;
}`" />

          <h3>Enums are readable but limited</h3>

          <p>Solidity enums don't have names at runtime — they're just integers. When you emit an event or return an enum, the ABI encodes it as a <code>uint8</code>. Your frontend needs the ABI to decode it back to a human-readable name.</p>

          <CodeBlock lang="solidity" :code="`// Returning an enum
function getStatus(uint256 orderId) external view returns (OrderStatus) {
    return orders[orderId].status;
}
// Returns 0 for Pending, 1 for Filled, 2 for Cancelled, 3 for Expired`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/building-blocks/mappings-and-arrays"
    prevText="Mappings and arrays"
    nextLink="/learn-solidity/building-blocks/events-and-logging"
    nextText="Events and logging"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity structs and enums' })
useSeoMeta({
  title: 'Solidity structs and enums',
  ogTitle: 'Solidity structs and enums',
  description: 'Group related data with structs. Represent state machines with enums.',
  ogDescription: 'Group related data with structs. Represent state machines with enums.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/building-blocks/structs-and-enums',
  twitterTitle: 'Solidity structs and enums',
  twitterDescription: 'Group related data with structs. Represent state machines with enums.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
