<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Inheritance and abstract contracts" tagline="Compose contracts from reusable base contracts — the way OpenZeppelin was designed to be used." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Basic inheritance</h2>

          <p>Solidity supports single and multiple inheritance using the <code>is</code> keyword. Derived contracts inherit all <code>public</code> and <code>internal</code> state variables, functions, and modifiers from their parents.</p>

          <CodeBlock lang="solidity" :code="`contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Not owner');
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}

contract MyToken is Ownable {
    mapping(address => uint256) public balances;

    function adminMint(address to, uint256 amount) external onlyOwner {
        // onlyOwner from Ownable is available here
        balances[to] += amount;
    }
}`" />

          <h2>Multiple inheritance</h2>

          <p>Solidity resolves multiple inheritance using C3 linearization. List parents from most-base to most-derived.</p>

          <CodeBlock lang="solidity" :code="`contract MyContract is Ownable, Pausable, ReentrancyGuard {
    function sensitiveAction() external onlyOwner whenNotPaused nonReentrant {
        // uses modifiers from all three parents
    }
}`" />

          <h2>Abstract contracts</h2>

          <p>An abstract contract has at least one function without an implementation. It cannot be deployed on its own — it must be inherited and its abstract functions implemented by a concrete contract.</p>

          <CodeBlock lang="solidity" :code="`abstract contract BaseToken {
    mapping(address => uint256) internal _balances;
    uint256 internal _totalSupply;

    // Must be implemented by the derived contract
    function decimals() public pure virtual returns (uint8);

    // Shared implementation available to all derived contracts
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
}

contract USDC is BaseToken {
    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

contract WETH is BaseToken {
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}`" />

          <h2>virtual and override</h2>

          <p>Functions that can be overridden must be marked <code>virtual</code>. Functions that override a parent must use <code>override</code>.</p>

          <CodeBlock lang="solidity" :code="`contract Base {
    function greet() public virtual returns (string memory) {
        return 'Hello from Base';
    }
}

contract Derived is Base {
    function greet() public override returns (string memory) {
        return 'Hello from Derived';
    }
}`" />

          <h2>Calling parent functions with super</h2>

          <CodeBlock lang="solidity" :code="`contract Derived is Base {
    function greet() public override returns (string memory) {
        string memory parentGreeting = super.greet();
        return string(abi.encodePacked(parentGreeting, ' and Derived'));
    }
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/building-blocks/modifiers"
    prevText="Modifiers"
    nextLink="/learn-solidity/building-blocks/interfaces"
    nextText="Interfaces"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity inheritance and abstract contracts' })
useSeoMeta({
  title: 'Solidity inheritance and abstract contracts',
  ogTitle: 'Solidity inheritance and abstract contracts',
  description: 'Compose contracts from reusable base contracts — the way OpenZeppelin was designed to be used.',
  ogDescription: 'Compose contracts from reusable base contracts — the way OpenZeppelin was designed to be used.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/building-blocks/inheritance-and-abstract-contracts',
  twitterTitle: 'Solidity inheritance and abstract contracts',
  twitterDescription: 'Compose contracts from reusable base contracts — the way OpenZeppelin was designed to be used.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
