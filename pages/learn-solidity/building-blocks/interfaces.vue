<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Interfaces" tagline="Define the shape of a contract without its implementation — the key to composable DeFi." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is an interface?</h2>

          <p>An interface declares a contract's external API — its function signatures — without any implementation. This lets you call functions on a contract at a known address without knowing or caring about its internal code.</p>

          <CodeBlock lang="solidity" :code="`interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}`" />

          <h2>Calling an external contract via interface</h2>

          <p>Once you have an interface, you can call any contract that implements it by wrapping its address.</p>

          <CodeBlock lang="solidity" :code="`contract LiquidityManager {
    function depositToken(address tokenAddress, uint256 amount) external {
        IERC20 token = IERC20(tokenAddress);

        // Pull tokens from the caller into this contract
        require(
            token.transferFrom(msg.sender, address(this), amount),
            'Transfer failed'
        );
    }
}`" />

          <h2>Interface rules</h2>

          <ul>
            <li>All functions must be <code>external</code></li>
            <li>No state variables</li>
            <li>No constructors</li>
            <li>No function implementations (no curly braces with code)</li>
            <li>Can declare events and errors</li>
          </ul>

          <h2>Standard interfaces you'll use constantly</h2>

          <p>The Ethereum ecosystem has standardized several critical interfaces. Knowing them is non-negotiable for DeFi development.</p>

          <CodeBlock lang="solidity" :code="`// ERC-20: Fungible tokens
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

// ERC-721: Non-fungible tokens
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

// Uniswap V2 core interfaces
interface IUniswapV2Pair {
    function getReserves() external view returns (
        uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast
    );
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
}

interface IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}`" />

          <h2>Interfaces enable composability</h2>

          <p>This is DeFi's superpower. Because all contracts that follow the same interface can be called the same way, protocols can compose on top of each other without needing access to each other's source code. A lending protocol can accept any ERC-20 as collateral. A DEX aggregator can route through any Uniswap V2-compatible pool. This is the money lego model.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/building-blocks/inheritance-and-abstract-contracts"
    prevText="Inheritance and abstract contracts"
    nextLink="/learn-solidity/working-with-ether/sending-and-receiving-ether"
    nextText="Sending and receiving Ether"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity interfaces' })
useSeoMeta({
  title: 'Solidity interfaces',
  ogTitle: 'Solidity interfaces',
  description: 'Define the shape of a contract without its implementation — the key to composable DeFi.',
  ogDescription: 'Define the shape of a contract without its implementation — the key to composable DeFi.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/building-blocks/interfaces',
  twitterTitle: 'Solidity interfaces',
  twitterDescription: 'Define the shape of a contract without its implementation — the key to composable DeFi.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
