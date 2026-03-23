<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Token swaps" tagline="How on-chain token exchange works — from the user's approve() call to the final transferFrom()." />

      <main class="w-content page-top">
        <section class="content">

          <h2>The full swap flow</h2>

          <p>A token swap through an AMM like those powering <a href="https://doodledapp.com" target="_blank" rel="noopener">Doodledapp.com</a> involves a specific sequence of calls. Understanding this flow is essential for building frontends and for auditing swap contracts.</p>

          <CodeBlock lang="solidity" :code="`// Step 1: User approves the router to spend their tokenIn
token.approve(address(router), amountIn);

// Step 2: User calls the router's swap function
router.swapExactTokensForTokens(
    amountIn,        // exact amount in
    minAmountOut,    // minimum acceptable output (slippage protection)
    path,            // [tokenA, tokenB] or [tokenA, WETH, tokenB] for multi-hop
    msg.sender,      // recipient
    deadline         // transaction must execute before this timestamp
);

// Step 3: Inside the router
// - Pulls tokenIn from user via transferFrom
// - Calls pair.swap() with computed output amount
// - Pair transfers tokenOut to recipient`" />

          <h2>Exact input vs. exact output swaps</h2>

          <CodeBlock lang="solidity" :code="`// Exact input: specify how much you're spending, get at least minOut
function swapExactTokensForTokens(
    uint256 amountIn,
    uint256 amountOutMin,
    address[] calldata path,
    address to,
    uint256 deadline
) external returns (uint256[] memory amounts);

// Exact output: specify how much you want, spend at most maxIn
function swapTokensForExactTokens(
    uint256 amountOut,
    uint256 amountInMax,
    address[] calldata path,
    address to,
    uint256 deadline
) external returns (uint256[] memory amounts);`" />

          <h2>Multi-hop swaps</h2>

          <p>Not every token pair has a direct pool. Routers can chain through multiple pools to find a path.</p>

          <CodeBlock lang="solidity" :code="`// Swap TOKEN_A → WETH → TOKEN_B
address[] memory path = new address[](3);
path[0] = TOKEN_A;
path[1] = WETH;
path[2] = TOKEN_B;

router.swapExactTokensForTokens(amountIn, minOut, path, recipient, deadline);`" />

          <h2>Calling a swap from another contract</h2>

          <p>Protocols routinely call swap functions programmatically — for example, auto-compounding yield, liquidating collateral, or rebalancing portfolios.</p>

          <CodeBlock lang="solidity" :code="`import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';

contract AutoCompound {
    IUniswapV2Router02 public immutable router;

    constructor(address _router) {
        router = IUniswapV2Router02(_router);
    }

    function swapRewards(
        address rewardToken,
        address targetToken,
        uint256 amount
    ) internal {
        IERC20(rewardToken).approve(address(router), amount);

        address[] memory path = new address[](2);
        path[0] = rewardToken;
        path[1] = targetToken;

        router.swapExactTokensForTokens(
            amount,
            0,              // accept any output (use slippage protection in production!)
            path,
            address(this),
            block.timestamp
        );
    }
}`" />

          <h2>Slippage and deadlines in production</h2>

          <p>Always set a meaningful <code>minAmountOut</code> and <code>deadline</code> in production. Zero slippage protection invites sandwich attacks. An expired deadline prevents a transaction from being included in a block far later than expected (when market conditions may have changed dramatically).</p>

          <CodeBlock lang="solidity" :code="`// 0.5% slippage tolerance
uint256 amountOutMin = (expectedAmountOut * 995) / 1000;

// Must execute within 20 minutes
uint256 deadline = block.timestamp + 20 minutes;`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/defi-patterns/liquidity-pools"
    prevText="Liquidity pools"
    nextLink="/learn-solidity/production/deploying-to-testnet"
    nextText="Deploying to testnet"
  />

  <Footer />
</template>

<script setup>
useHead({ title: 'Solidity token swaps' })
useSeoMeta({
  title: 'Solidity token swaps',
  ogTitle: 'Solidity token swaps',
  description: 'How on-chain token exchange works — from the user\'s approve() call to the final transferFrom().',
  ogDescription: 'How on-chain token exchange works — from the user\'s approve() call to the final transferFrom().',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/defi-patterns/token-swaps',
  twitterTitle: 'Solidity token swaps',
  twitterDescription: 'How on-chain token exchange works — from the user\'s approve() call to the final transferFrom().',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
