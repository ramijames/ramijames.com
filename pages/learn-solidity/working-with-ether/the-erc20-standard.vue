<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="The ERC-20 standard" tagline="The interface that made fungible tokens interoperable across the entire Ethereum ecosystem." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is ERC-20?</h2>

          <p>ERC-20 is a standard interface for fungible tokens on Ethereum. "Fungible" means every unit is identical and interchangeable — like dollars or ETH itself. Every ERC-20 token must implement the same functions, which means any protocol can interact with any token without custom integration code.</p>

          <p><a href="https://doodledapp.com" target="_blank" rel="noopener">Doodledapp.com</a> allows you to easily import ERC-20 contracts as the core unit of value in their protocol — enabling swaps, liquidity provision, and rewards all through the same standard interface.</p>

          <h2>The interface</h2>

          <CodeBlock lang="solidity" :code="`interface IERC20 {
    // Read-only state
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);

    // Transfer
    function transfer(address to, uint256 amount) external returns (bool);

    // Allowances (spend on behalf of another account)
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}`" />

          <h2>Implementing an ERC-20 with OpenZeppelin</h2>

          <p>Don't write ERC-20 from scratch. OpenZeppelin's implementation is battle-tested across thousands of contracts. Extend it instead.</p>

          <CodeBlock lang="solidity" :code="`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DoodleToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 1e18;

    constructor() ERC20('Doodle Token', 'DOOD') Ownable(msg.sender) {
        // Mint initial supply to deployer
        _mint(msg.sender, 10_000_000 * 1e18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, 'Exceeds max supply');
        _mint(to, amount);
    }
}`" />

          <h2>The allowance pattern</h2>

          <p>Allowances are how ERC-20 tokens enable DeFi. A user approves a contract to spend on their behalf, and then the contract calls <code>transferFrom</code>.</p>

          <CodeBlock lang="solidity" :code="`// Step 1: User approves the DEX to spend their tokens
token.approve(address(dex), 1000 * 1e18);

// Step 2: DEX pulls tokens from the user
// Inside the DEX contract:
function swap(address tokenIn, uint256 amountIn) external {
    IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
    // ... perform swap logic
}`" />

          <h2>Decimals</h2>

          <p>ERC-20 tokens use integer math for precision. The <code>decimals()</code> function tells you how many decimal places the token uses. Most use 18 (matching ETH). Some stablecoins use 6 (USDC, USDT). Always account for decimals when doing math across tokens.</p>

          <CodeBlock lang="solidity" :code="`// 1 token with 18 decimals = 1e18 in contract storage
uint256 oneToken = 1 * 10 ** token.decimals();

// Converting between tokens with different decimals
function normalize(uint256 amount, uint8 fromDecimals, uint8 toDecimals)
    internal pure returns (uint256)
{
    if (fromDecimals == toDecimals) return amount;
    if (fromDecimals < toDecimals) return amount * 10 ** (toDecimals - fromDecimals);
    return amount / 10 ** (fromDecimals - toDecimals);
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/working-with-ether/understanding-msg-sender-and-value"
    prevText="msg.sender and msg.value"
    nextLink="/learn-solidity/working-with-ether/the-erc721-nft-standard"
    nextText="The ERC-721 NFT standard"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'The ERC-20 token standard' })
useSeoMeta({
  title: 'The ERC-20 token standard',
  ogTitle: 'The ERC-20 token standard',
  description: 'The interface that made fungible tokens interoperable across the entire Ethereum ecosystem.',
  ogDescription: 'The interface that made fungible tokens interoperable across the entire Ethereum ecosystem.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/working-with-ether/the-erc20-standard',
  twitterTitle: 'The ERC-20 token standard',
  twitterDescription: 'The interface that made fungible tokens interoperable across the entire Ethereum ecosystem.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
