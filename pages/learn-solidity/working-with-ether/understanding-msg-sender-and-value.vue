<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="msg.sender and msg.value" tagline="The two most important global variables in Solidity — understanding them is understanding who's calling and how much they're sending." />

      <main class="w-content page-top">
        <section class="content">

          <h2>The global message context</h2>

          <p>Every Solidity function call comes with an implicit <code>msg</code> object containing context about the transaction. The two most important properties are <code>msg.sender</code> and <code>msg.value</code>.</p>

          <h2>msg.sender</h2>

          <p><code>msg.sender</code> is the address of the entity that called the current function. It could be an externally owned account (a wallet) or another contract.</p>

          <CodeBlock lang="solidity" :code="`contract AccessControlled {
    address public owner;

    constructor() {
        owner = msg.sender;  // whoever deployed this contract
    }

    function adminAction() external {
        require(msg.sender == owner, 'Only owner');
        // ...
    }
}`" />

          <h3>msg.sender in call chains</h3>

          <p>When Contract A calls Contract B, inside Contract B, <code>msg.sender</code> is Contract A's address — not the original wallet. This is a critical distinction for security.</p>

          <CodeBlock lang="solidity" :code="`// Wallet → Contract A → Contract B
// Inside Contract B:
//   msg.sender == address(Contract A)
//   tx.origin == address of the original wallet

// tx.origin is the original sender — but NEVER use it for authentication
// It's exploitable: a malicious contract can trick a user into calling it,
// and then tx.origin will still be the user's wallet.`" />

          <h2>msg.value</h2>

          <p><code>msg.value</code> is the amount of ETH (in wei) sent with the function call. It's only accessible in <code>payable</code> functions.</p>

          <CodeBlock lang="solidity" :code="`// 1 ether = 1e18 wei
// msg.value is always in wei

function buy() external payable {
    require(msg.value >= 0.05 ether, 'Minimum 0.05 ETH');
    uint256 tokens = (msg.value * 1000) / 1 ether;  // 1000 tokens per ETH
    _mint(msg.sender, tokens);
}`" />

          <h2>Other useful msg and block globals</h2>

          <CodeBlock lang="solidity" :code="`msg.data       // full calldata as bytes
msg.sig        // first 4 bytes of calldata (function selector)

block.timestamp    // current block timestamp (Unix seconds)
block.number       // current block number
block.basefee      // current block base fee in wei (EIP-1559)
block.chainid      // chain ID (1 for mainnet, 11155111 for Sepolia)

tx.gasprice    // gas price of the transaction`" />

          <h3>block.timestamp caution</h3>

          <p><code>block.timestamp</code> is set by the block validator and can be manipulated slightly (within ~15 seconds). Never use it as a source of randomness or for precise timing — use it only for broad time ranges (hours, days, weeks).</p>

          <CodeBlock lang="solidity" :code="`// Fine: broad time checks
require(block.timestamp >= vestingStart + 30 days, 'Still vesting');

// Dangerous: using for randomness
uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp)));
// Validators can influence this — don't use it for anything with value at stake`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/working-with-ether/sending-and-receiving-ether"
    prevText="Sending and receiving Ether"
    nextLink="/learn-solidity/working-with-ether/the-erc20-standard"
    nextText="The ERC-20 standard"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity msg.sender and msg.value' })
useSeoMeta({
  title: 'Solidity msg.sender and msg.value',
  ogTitle: 'Solidity msg.sender and msg.value',
  description: 'The two most important global variables in Solidity — understanding them is understanding who\'s calling and how much they\'re sending.',
  ogDescription: 'The two most important global variables in Solidity — understanding them is understanding who\'s calling and how much they\'re sending.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/working-with-ether/understanding-msg-sender-and-value',
  twitterTitle: 'Solidity msg.sender and msg.value',
  twitterDescription: 'The two most important global variables in Solidity.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
