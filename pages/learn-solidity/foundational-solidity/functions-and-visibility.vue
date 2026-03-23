<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Functions and visibility" tagline="Who can call your functions — and what can they do? Visibility and state mutability explained." />

      <main class="w-content page-top">
        <section class="content">

          <h2>Visibility modifiers</h2>

          <p>Every function and state variable in Solidity has a visibility level. Getting this wrong is one of the most common sources of security vulnerabilities.</p>

          <h3>public</h3>
          <p>Callable from anywhere: externally (from other contracts or wallets), internally (within the contract), and via the ABI. State variables marked <code>public</code> automatically get a getter function.</p>

          <CodeBlock lang="solidity" :code="`uint256 public totalSupply;  // auto-generates a totalSupply() getter

function mint(address to, uint256 amount) public {
    // Anyone can call this — be careful!
}`" />

          <h3>external</h3>
          <p>Can only be called from outside the contract — not from within. Slightly cheaper than <code>public</code> for functions that only need external access, because arguments are read from <code>calldata</code> instead of being copied to memory.</p>

          <CodeBlock lang="solidity" :code="`function deposit() external payable {
    // Can only be called from outside this contract
}`" />

          <h3>internal</h3>
          <p>Callable from within the contract and from derived contracts (via inheritance). Not accessible from outside.</p>

          <CodeBlock lang="solidity" :code="`function _beforeTransfer(address from, address to, uint256 amount) internal {
    // Shared logic used by multiple transfer functions
}`" />

          <h3>private</h3>
          <p>Only callable from within the contract itself. Not accessible from derived contracts.</p>

          <CodeBlock lang="solidity" :code="`function _updateBalance(address account, uint256 newBalance) private {
    balances[account] = newBalance;
}`" />

          <h2>State mutability</h2>

          <p>State mutability describes what a function is allowed to do with contract state.</p>

          <h3>view</h3>
          <p>Promises not to modify state. Reading state variables is fine. Free to call (no gas) when called externally.</p>

          <CodeBlock lang="solidity" :code="`function balanceOf(address account) public view returns (uint256) {
    return balances[account];
}`" />

          <h3>pure</h3>
          <p>Cannot read <em>or</em> write state. Used for pure computation.</p>

          <CodeBlock lang="solidity" :code="`function toWei(uint256 ether_amount) public pure returns (uint256) {
    return ether_amount * 1e18;
}`" />

          <h3>payable</h3>
          <p>Allows the function to receive Ether. Functions without <code>payable</code> will revert if you send ETH to them.</p>

          <CodeBlock lang="solidity" :code="`function deposit() external payable {
    require(msg.value > 0, 'Send some ETH');
    balances[msg.sender] += msg.value;
}`" />

          <h2>Return values</h2>

          <p>Functions can return multiple values using tuple syntax.</p>

          <CodeBlock lang="solidity" :code="`function getPoolInfo() external view returns (uint256 reserve0, uint256 reserve1, uint256 totalLiquidity) {
    return (_reserve0, _reserve1, _totalLiquidity);
}`" />

          <p>Named return variables can be used to improve readability and skip the explicit <code>return</code> statement.</p>

          <CodeBlock lang="solidity" :code="`function divide(uint256 a, uint256 b) public pure returns (uint256 result, bool success) {
    if (b == 0) return (0, false);
    result = a / b;
    success = true;
    // no return statement needed — named variables are returned automatically
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/foundational-solidity/data-types-and-variables"
    prevText="Data types and variables"
    nextLink="/learn-solidity/foundational-solidity/control-flow"
    nextText="Control flow"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity functions and visibility' })
useSeoMeta({
  title: 'Solidity functions and visibility',
  ogTitle: 'Solidity functions and visibility',
  description: 'Who can call your functions — and what can they do? Visibility and state mutability explained.',
  ogDescription: 'Who can call your functions — and what can they do? Visibility and state mutability explained.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/foundational-solidity/functions-and-visibility',
  twitterTitle: 'Solidity functions and visibility',
  twitterDescription: 'Who can call your functions — and what can they do? Visibility and state mutability explained.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
