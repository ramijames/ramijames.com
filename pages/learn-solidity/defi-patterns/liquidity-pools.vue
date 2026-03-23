<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Liquidity pools" tagline="How liquidity providers earn fees, what LP tokens represent, and the mechanics of adding and removing liquidity." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What is a liquidity pool?</h2>

          <p>A liquidity pool is a contract that holds reserves of two tokens. Users called Liquidity Providers (LPs) deposit both tokens in proportion to the current reserves, and in return receive LP tokens that represent their share of the pool. When traders swap through the pool, they pay a fee that accrues to LPs.</p>

          <h2>LP tokens</h2>

          <p>LP tokens are ERC-20 tokens. They're minted when you deposit liquidity and burned when you withdraw. The amount you receive reflects your proportional share of the pool at the time of deposit.</p>

          <CodeBlock lang="solidity" :code="`// Adding liquidity and minting LP tokens
function addLiquidity(
    uint256 amountA,
    uint256 amountB
) external returns (uint256 liquidity) {
    tokenA.transferFrom(msg.sender, address(this), amountA);
    tokenB.transferFrom(msg.sender, address(this), amountB);

    uint256 totalSupply = lpToken.totalSupply();

    if (totalSupply == 0) {
        // First liquidity: mint sqrt(amountA * amountB) LP tokens
        liquidity = Math.sqrt(amountA * amountB);
    } else {
        // Subsequent: mint proportional to smaller of the two ratios
        liquidity = Math.min(
            (amountA * totalSupply) / reserveA,
            (amountB * totalSupply) / reserveB
        );
    }

    require(liquidity > 0, 'Insufficient liquidity minted');
    lpToken.mint(msg.sender, liquidity);

    reserveA += amountA;
    reserveB += amountB;
}`" />

          <h2>Removing liquidity</h2>

          <CodeBlock lang="solidity" :code="`function removeLiquidity(uint256 liquidity) external returns (uint256 amountA, uint256 amountB) {
    uint256 totalSupply = lpToken.totalSupply();

    // Proportional share of both reserves
    amountA = (liquidity * reserveA) / totalSupply;
    amountB = (liquidity * reserveB) / totalSupply;

    require(amountA > 0 && amountB > 0, 'Insufficient liquidity burned');

    lpToken.burnFrom(msg.sender, liquidity);

    reserveA -= amountA;
    reserveB -= amountB;

    tokenA.transfer(msg.sender, amountA);
    tokenB.transfer(msg.sender, amountB);
}`" />

          <h2>Impermanent loss</h2>

          <p>When the price ratio between the two pooled tokens changes, LPs end up with a different ratio than they deposited. This "impermanent loss" means they'd have been better off just holding the tokens — unless fees earned compensate for it. The loss is impermanent because it disappears if the price ratio returns to its original state.</p>

          <p>Understanding impermanent loss is critical for evaluating liquidity provision as a strategy. High-volume pools with thin price swings (like stablecoin pairs) tend to minimize it.</p>

          <h2>Fee accumulation</h2>

          <p>The standard Uniswap V2 fee is 0.3% per swap. This fee stays in the pool — it's not distributed separately. As fees accumulate, the reserves grow, making each LP token worth more tokens when it's eventually redeemed.</p>

          <CodeBlock lang="solidity" :code="`// Fee is built into the swap formula:
// amountInWithFee = amountIn * 997  (0.3% stays in pool)
// The reserves grow by the fee amount on every trade
// LPs capture this when they burn their LP tokens and withdraw reserves`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/defi-patterns/amm-basics"
    prevText="AMM basics"
    nextLink="/learn-solidity/defi-patterns/token-swaps"
    nextText="Token swaps"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity liquidity pools' })
useSeoMeta({
  title: 'Solidity liquidity pools',
  ogTitle: 'Solidity liquidity pools',
  description: 'How LPs earn fees, what LP tokens represent, and the mechanics of adding and removing liquidity.',
  ogDescription: 'How LPs earn fees, what LP tokens represent, and the mechanics of adding and removing liquidity.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/defi-patterns/liquidity-pools',
  twitterTitle: 'Solidity liquidity pools',
  twitterDescription: 'How LPs earn fees, what LP tokens represent, and the mechanics of adding and removing liquidity.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
