<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Access control patterns" tagline="Who can do what in your contract — and how to enforce it correctly at scale." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Simple ownership: Ownable</h2>

          <p>The simplest form of access control. One address (the owner) can call privileged functions. OpenZeppelin's <code>Ownable</code> is the standard implementation — don't roll your own.</p>

          <CodeBlock lang="solidity" :code="`import '@openzeppelin/contracts/access/Ownable.sol';

contract MyProtocol is Ownable {
    uint256 public fee;

    constructor() Ownable(msg.sender) {}

    // Only the owner can change the fee
    function setFee(uint256 newFee) external onlyOwner {
        fee = newFee;
    }

    // Transfer ownership to a multisig
    function handOffToMultisig(address multisig) external onlyOwner {
        transferOwnership(multisig);
    }
}`" />

          <h2>Role-based access control: AccessControl</h2>

          <p>For protocols that need multiple privilege levels (admin, minter, pauser, operator), OpenZeppelin's <code>AccessControl</code> provides a flexible role system.</p>

          <CodeBlock lang="solidity" :code="`import '@openzeppelin/contracts/access/AccessControl.sol';

contract ManagedToken is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
    bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');

    mapping(address => uint256) public balances;
    bool public paused;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        balances[to] += amount;
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        paused = true;
    }

    // Admin can grant/revoke roles
    // grantRole(MINTER_ROLE, address) — inherited from AccessControl
}`" />

          <h2>Multisig ownership</h2>

          <p>Single-owner contracts are a central point of failure — if the owner's key is compromised, the protocol is compromised. Production contracts should be owned by a multisig (e.g., Gnosis Safe), requiring M-of-N keyholders to approve any privileged transaction.</p>

          <CodeBlock lang="solidity" :code="`// Transfer ownership to a Gnosis Safe multisig after deploy
// In your deployment script:
await contract.transferOwnership(GNOSIS_SAFE_ADDRESS);`" />

          <h2>Timelocks</h2>

          <p>Even with a multisig, users should be able to exit a protocol before a dangerous change takes effect. A timelock adds a mandatory delay between when an action is proposed and when it can be executed.</p>

          <CodeBlock lang="solidity" :code="`// OpenZeppelin TimelockController
// Owner → TimelockController → Protocol contract
// Any admin action must wait MIN_DELAY before executing
// This gives users time to react and withdraw if they disagree

import '@openzeppelin/contracts/governance/TimelockController.sol';`" />

          <h2>Emergency pause</h2>

          <p>A pause mechanism lets you halt the protocol in case of an active exploit.</p>

          <CodeBlock lang="solidity" :code="`import '@openzeppelin/contracts/utils/Pausable.sol';

contract PausableProtocol is Pausable, Ownable {
    constructor() Ownable(msg.sender) {}

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function deposit(uint256 amount) external whenNotPaused {
        // Can't call this when paused
    }
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/security/reentrancy-attacks"
    prevText="Reentrancy attacks"
    nextLink="/learn-solidity/security/gas-optimization"
    nextText="Gas optimization"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity access control patterns' })
useSeoMeta({
  title: 'Solidity access control patterns',
  ogTitle: 'Solidity access control patterns',
  description: 'Who can do what in your contract — and how to enforce it correctly at scale.',
  ogDescription: 'Who can do what in your contract — and how to enforce it correctly at scale.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/security/access-control-patterns',
  twitterTitle: 'Solidity access control patterns',
  twitterDescription: 'Who can do what in your contract — and how to enforce it correctly at scale.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
