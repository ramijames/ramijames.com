<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="AMM basics" tagline="How automated market makers replaced order books — and the math that makes them work." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is an AMM?</h2>

          <p>An Automated Market Maker (AMM) is a smart contract that holds reserves of two (or more) tokens and allows users to swap between them algorithmically — no order book, no matching engine, no counterparty needed. Price is determined by the ratio of reserves according to a mathematical formula.</p>

          <h2>The constant product formula</h2>

          <p>Uniswap V2 uses the simplest and most influential AMM formula: <code>x * y = k</code>. Where <code>x</code> and <code>y</code> are the reserves of two tokens, and <code>k</code> is a constant that must hold after every trade (minus fees).</p>

          <CodeBlock lang="solidity" :code="`// k = reserve0 * reserve1 must remain constant after a swap
//
// Before swap:   reserve0 = 1000, reserve1 = 1000, k = 1,000,000
// User swaps in 100 of token0:
//   newReserve0 = 1100
//   newReserve1 = k / newReserve0 = 1,000,000 / 1100 ≈ 909
//   User receives: 1000 - 909 = 91 of token1
//
// The price moved because the reserves changed.
// Larger trades cause more 'slippage' — worse prices.`" />

          <h2>A minimal AMM swap implementation</h2>

          <CodeBlock lang="solidity" :code="`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

contract SimpleAMM is ReentrancyGuard {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    uint256 public constant FEE_NUMERATOR = 997;
    uint256 public constant FEE_DENOMINATOR = 1000;  // 0.3% fee

    event Swap(address indexed sender, uint256 amountIn, uint256 amountOut, bool aToB);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256 amountOut) {
        require(amountIn > 0, 'Insufficient input');
        require(reserveIn > 0 && reserveOut > 0, 'No liquidity');

        uint256 amountInWithFee = amountIn * FEE_NUMERATOR;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * FEE_DENOMINATOR) + amountInWithFee;
        amountOut = numerator / denominator;
    }

    function swapAForB(uint256 amountIn, uint256 minAmountOut) external nonReentrant {
        uint256 amountOut = getAmountOut(amountIn, reserveA, reserveB);
        require(amountOut >= minAmountOut, 'Slippage too high');

        tokenA.transferFrom(msg.sender, address(this), amountIn);
        tokenB.transfer(msg.sender, amountOut);

        reserveA += amountIn;
        reserveB -= amountOut;

        emit Swap(msg.sender, amountIn, amountOut, true);
    }
}`" />

          <h2>Price impact and slippage</h2>

          <p>The larger a swap relative to the pool's reserves, the more the price moves against the swapper. This is called price impact. <code>minAmountOut</code> (a slippage tolerance parameter) protects users from getting a dramatically worse price than expected due to front-running or thin liquidity.</p>

          <h2>Why AMMs replaced order books</h2>

          <ul>
            <li>Always available — no need for a counterparty willing to trade</li>
            <li>Fully on-chain — no off-chain matching engine</li>
            <li>Permissionless — anyone can add liquidity and earn fees</li>
            <li>Composable — other contracts can call swap functions directly</li>
          </ul>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/security/gas-optimization"
    prevText="Gas optimization"
    nextLink="/learn-solidity/defi-patterns/liquidity-pools"
    nextText="Liquidity pools"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'AMM basics in Solidity' })
useSeoMeta({
  title: 'AMM basics in Solidity',
  ogTitle: 'AMM basics in Solidity',
  description: 'How automated market makers replaced order books — and the math that makes them work.',
  ogDescription: 'How automated market makers replaced order books — and the math that makes them work.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/defi-patterns/amm-basics',
  twitterTitle: 'AMM basics in Solidity',
  twitterDescription: 'How automated market makers replaced order books — and the math that makes them work.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
