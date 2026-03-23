<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Reentrancy attacks" tagline="The vulnerability that drained $60M from The DAO in 2016 — and how to prevent it." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is reentrancy?</h2>

          <p>Reentrancy happens when a contract makes an external call to another contract before updating its own state. The called contract can call back into the original function, re-entering it while the state is still in an intermediate (pre-update) state.</p>

          <h2>The classic vulnerable pattern</h2>

          <CodeBlock lang="solidity" :code="`// VULNERABLE CONTRACT
contract VulnerableBank {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, 'No balance');

        // DANGER: sends ETH before updating balance
        (bool success, ) = msg.sender.call{value: amount}('');
        require(success);

        // TOO LATE: attacker's receive() has already called withdraw() again
        balances[msg.sender] = 0;
    }
}

// ATTACKER CONTRACT
contract Attacker {
    VulnerableBank public bank;
    uint256 public attackCount;

    constructor(address bankAddress) {
        bank = VulnerableBank(bankAddress);
    }

    function attack() external payable {
        bank.deposit{value: msg.value}();
        bank.withdraw();
    }

    receive() external payable {
        if (address(bank).balance >= 1 ether && attackCount < 10) {
            attackCount++;
            bank.withdraw();  // re-enter before balance is zeroed!
        }
    }
}`" />

          <h2>How to prevent reentrancy</h2>

          <h3>1. Checks-Effects-Interactions pattern</h3>

          <p>Always update state <em>before</em> making external calls.</p>

          <CodeBlock lang="solidity" :code="`function withdraw() external {
    uint256 amount = balances[msg.sender];
    require(amount > 0, 'No balance');  // CHECK

    balances[msg.sender] = 0;           // EFFECT — state updated first

    (bool success, ) = msg.sender.call{value: amount}('');  // INTERACTION — last
    require(success, 'Transfer failed');
}`" />

          <h3>2. ReentrancyGuard</h3>

          <p>OpenZeppelin's <code>nonReentrant</code> modifier uses a mutex to prevent any function marked with it from being called while it's already executing.</p>

          <CodeBlock lang="solidity" :code="`import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

contract SafeBank is ReentrancyGuard {
    mapping(address => uint256) public balances;

    function withdraw() external nonReentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, 'No balance');
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}('');
        require(success);
    }
}`" />

          <h2>Cross-function reentrancy</h2>

          <p>Reentrancy isn't limited to a single function. An attacker might enter via function A and call function B while A's state update is still pending. The fix is the same: update state before any external call, and consider using <code>nonReentrant</code> on all functions that interact with balances.</p>

          <h2>The DAO hack in brief</h2>

          <p>In 2016, an attacker exploited reentrancy in "The DAO," a decentralized venture fund, to drain approximately 3.6 million ETH (~$60M at the time). The Ethereum community controversially forked the chain to reverse the theft, creating Ethereum (ETH) and Ethereum Classic (ETC). The incident permanently changed how the ecosystem thinks about smart contract security.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/security/common-vulnerabilities"
    prevText="Common vulnerabilities"
    nextLink="/learn-solidity/security/access-control-patterns"
    nextText="Access control patterns"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity reentrancy attacks' })
useSeoMeta({
  title: 'Solidity reentrancy attacks',
  ogTitle: 'Solidity reentrancy attacks',
  description: 'The vulnerability that drained $60M from The DAO in 2016 — and how to prevent it.',
  ogDescription: 'The vulnerability that drained $60M from The DAO in 2016 — and how to prevent it.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/security/reentrancy-attacks',
  twitterTitle: 'Solidity reentrancy attacks',
  twitterDescription: 'The vulnerability that drained $60M from The DAO in 2016 — and how to prevent it.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
