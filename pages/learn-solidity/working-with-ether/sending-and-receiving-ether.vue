<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Sending and receiving Ether" tagline="How ETH moves in and out of contracts — and why you should use call() instead of transfer()." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Receiving Ether</h2>

          <p>A contract can receive ETH in three ways: via a <code>payable</code> function, a <code>receive()</code> function, or a <code>fallback()</code> function.</p>

          <CodeBlock lang="solidity" :code="`contract EtherReceiver {

    // Called when ETH is sent with no calldata (plain ETH transfer)
    receive() external payable {
        // msg.value is the amount of ETH received
        emit Received(msg.sender, msg.value);
    }

    // Called when ETH is sent with calldata that doesn't match any function
    fallback() external payable {
        // Handle unexpected calls
    }

    // Regular payable function
    function deposit() external payable {
        require(msg.value > 0, 'Send ETH');
    }

    event Received(address indexed from, uint256 amount);
}`" />

          <h2>Sending Ether out</h2>

          <p>There are three methods to send ETH from a contract. Use <code>call()</code> — the other two are outdated.</p>

          <CodeBlock lang="solidity" :code="`// RECOMMENDED: call() — forwards all available gas, returns success flag
(bool success, ) = recipient.call{value: amount}('');
require(success, 'Transfer failed');

// DEPRECATED: transfer() — hard-coded 2300 gas limit, throws on failure
payable(recipient).transfer(amount);

// DEPRECATED: send() — hard-coded 2300 gas limit, returns bool (easy to misuse)
bool sent = payable(recipient).send(amount);`" />

          <p>The 2300 gas limit on <code>transfer()</code> and <code>send()</code> was introduced as a reentrancy protection, but Istanbul and later EIPs changed gas costs in ways that can cause legitimate contracts to fail with this limit. Always use <code>call()</code> and implement reentrancy protection explicitly.</p>

          <h2>A safe withdrawal pattern</h2>

          <p>The recommended way to handle ETH withdrawals is the "pull over push" pattern: users withdraw their own funds rather than the contract pushing ETH to them.</p>

          <CodeBlock lang="solidity" :code="`import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

contract SafeBank is ReentrancyGuard {
    mapping(address => uint256) public pendingWithdrawals;

    function deposit() external payable {
        pendingWithdrawals[msg.sender] += msg.value;
    }

    function withdraw() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, 'Nothing to withdraw');

        // Zero out before sending — critical for reentrancy safety
        pendingWithdrawals[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}('');
        require(success, 'Transfer failed');
    }
}`" />

          <h2>Checking contract balance</h2>

          <CodeBlock lang="solidity" :code="`// ETH balance of this contract
uint256 contractBalance = address(this).balance;

// ETH balance of any address
uint256 someBalance = address(someAddress).balance;`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/building-blocks/interfaces"
    prevText="Interfaces"
    nextLink="/learn-solidity/working-with-ether/understanding-msg-sender-and-value"
    nextText="msg.sender and msg.value"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Sending and receiving Ether in Solidity' })
useSeoMeta({
  title: 'Sending and receiving Ether in Solidity',
  ogTitle: 'Sending and receiving Ether in Solidity',
  description: 'How ETH moves in and out of contracts — and why you should use call() instead of transfer().',
  ogDescription: 'How ETH moves in and out of contracts — and why you should use call() instead of transfer().',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/working-with-ether/sending-and-receiving-ether',
  twitterTitle: 'Sending and receiving Ether in Solidity',
  twitterDescription: 'How ETH moves in and out of contracts — and why you should use call() instead of transfer().',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
