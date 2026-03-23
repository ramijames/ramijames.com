<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="Connecting to frontends" tagline="Bridge your Solidity contract to a web frontend with ethers.js and wagmi — the same stack used by Doodledapp.com." />

      <main class="w-content page-top">
        <section class="content">

          <h2>The frontend stack</h2>

          <p>Most DeFi frontends use a combination of:</p>

          <ul>
            <li><strong>ethers.js</strong> or <strong>viem</strong> — Low-level Ethereum interaction library</li>
            <li><strong>wagmi</strong> — React hooks for wallet connection and contract interaction</li>
            <li><strong>RainbowKit</strong> or <strong>ConnectKit</strong> — Pre-built wallet connection UI</li>
          </ul>

          <h2>The ABI</h2>

          <p>The ABI (Application Binary Interface) is the contract's public interface description — a JSON array that tells ethers.js how to encode function calls and decode responses. You get it from Hardhat's compilation output in <code>artifacts/</code>.</p>

          <CodeBlock lang="javascript" :code="`// Import ABI from compilation artifacts
import MyTokenABI from './artifacts/contracts/MyToken.sol/MyToken.json';

const abi = MyTokenABI.abi;`" />

          <h2>Reading from a contract (ethers.js)</h2>

          <CodeBlock lang="javascript" :code="`import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x...';

// Read-only provider — no wallet needed
const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/KEY');
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

// Call a view function
const balance = await contract.balanceOf('0x...');
console.log(ethers.formatEther(balance));  // converts from wei to ETH string`" />

          <h2>Writing to a contract (ethers.js)</h2>

          <CodeBlock lang="javascript" :code="`// Connect to user's wallet
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

// Call a state-changing function
const tx = await contract.transfer('0x...', ethers.parseEther('1.0'));
await tx.wait();  // wait for the transaction to be mined
console.log('Transfer confirmed in block', tx.blockNumber);`" />

          <h2>Using wagmi in React</h2>

          <CodeBlock lang="javascript" :code="`// Read contract state
import { useReadContract } from 'wagmi';

function TokenBalance({ address }) {
  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'balanceOf',
    args: [address],
  });

  return <div>{balance ? formatEther(balance) : '...'} tokens</div>;
}

// Write to contract
import { useWriteContract } from 'wagmi';

function TransferButton() {
  const { writeContract } = useWriteContract();

  return (
    <button onClick={() =>
      writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: 'transfer',
        args: [recipient, parseEther('1.0')],
      })
    }>
      Transfer 1 Token
    </button>
  );
}`" />

          <h2>Listening for events</h2>

          <CodeBlock lang="javascript" :code="eventListenerCode" />

          <h2>Handling errors</h2>

          <p>Always handle contract reverts gracefully in your frontend. ethers.js wraps revert reasons in the error message.</p>

          <CodeBlock lang="javascript" :code="`try {
  const tx = await contract.withdraw();
  await tx.wait();
} catch (err) {
  if (err.code === 'ACTION_REJECTED') {
    // User rejected the transaction in their wallet
  } else if (err.reason) {
    // Contract revert: err.reason contains the revert message
    console.error('Contract error:', err.reason);
  }
}`" />

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/production/verifying-contracts"
    prevText="Verifying contracts"
    nextLink="/learn-solidity/production/auditing-your-contracts"
    nextText="Auditing your contracts"
  />

  <Footer />
</template>

<script setup>
const eventListenerCode = `// Listen for Transfer events in real-time
contract.on('Transfer', (from, to, value, event) => {
  console.log(from + ' → ' + to + ': ' + ethers.formatEther(value) + ' tokens');
  console.log('Transaction hash:', event.transactionHash);
});

// Clean up listener
contract.off('Transfer', listener);`

useHead({ title: 'Connecting Solidity contracts to frontends' })
useSeoMeta({
  title: 'Connecting Solidity contracts to frontends',
  ogTitle: 'Connecting Solidity contracts to frontends',
  description: 'Bridge your Solidity contract to a web frontend with ethers.js and wagmi.',
  ogDescription: 'Bridge your Solidity contract to a web frontend with ethers.js and wagmi.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/production/connecting-to-frontends',
  twitterTitle: 'Connecting Solidity contracts to frontends',
  twitterDescription: 'Bridge your Solidity contract to a web frontend with ethers.js and wagmi.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
