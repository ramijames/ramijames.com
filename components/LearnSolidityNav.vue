<template>
  <LearnNav :sections="sections" stateKey="learnsolidity-nav-open" :innerNav="innerNav" />
</template>

<script lang="ts" setup>

defineProps({
  innerNav: Boolean
})

const sections = [
  {
    title: 'Foundational Solidity',
    links: [
      { to: '/learn-solidity/foundational-solidity/why-solidity', label: 'Why Solidity?', difficulty: 'easy' },
      { to: '/learn-solidity/foundational-solidity/setting-up-your-dev-environment', label: 'Setting up your dev environment', difficulty: 'easy' },
      { to: '/learn-solidity/foundational-solidity/your-first-contract', label: 'Your first contract', difficulty: 'easy' },
      { to: '/learn-solidity/foundational-solidity/data-types-and-variables', label: 'Data types and variables', difficulty: 'easy' },
      { to: '/learn-solidity/foundational-solidity/functions-and-visibility', label: 'Functions and visibility', difficulty: 'easy' },
      { to: '/learn-solidity/foundational-solidity/control-flow', label: 'Control flow', difficulty: 'easy' },
    ]
  },
  {
    title: 'Building Blocks',
    links: [
      { to: '/learn-solidity/building-blocks/mappings-and-arrays', label: 'Mappings and arrays', difficulty: 'easy' },
      { to: '/learn-solidity/building-blocks/structs-and-enums', label: 'Structs and enums', difficulty: 'easy' },
      { to: '/learn-solidity/building-blocks/events-and-logging', label: 'Events and logging', difficulty: 'easy' },
      { to: '/learn-solidity/building-blocks/modifiers', label: 'Modifiers', difficulty: 'easy' },
      { to: '/learn-solidity/building-blocks/inheritance-and-abstract-contracts', label: 'Inheritance and abstract contracts', difficulty: 'intermediate' },
      { to: '/learn-solidity/building-blocks/interfaces', label: 'Interfaces', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Working with Ether',
    links: [
      { to: '/learn-solidity/working-with-ether/sending-and-receiving-ether', label: 'Sending and receiving Ether', difficulty: 'intermediate' },
      { to: '/learn-solidity/working-with-ether/understanding-msg-sender-and-value', label: 'msg.sender and msg.value', difficulty: 'intermediate' },
      { to: '/learn-solidity/working-with-ether/the-erc20-standard', label: 'The ERC-20 standard', difficulty: 'intermediate' },
      { to: '/learn-solidity/working-with-ether/the-erc721-nft-standard', label: 'The ERC-721 NFT standard', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Security',
    links: [
      { to: '/learn-solidity/security/common-vulnerabilities', label: 'Common vulnerabilities', difficulty: 'intermediate' },
      { to: '/learn-solidity/security/reentrancy-attacks', label: 'Reentrancy attacks', difficulty: 'intermediate' },
      { to: '/learn-solidity/security/access-control-patterns', label: 'Access control patterns', difficulty: 'intermediate' },
      { to: '/learn-solidity/security/gas-optimization', label: 'Gas optimization', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'DeFi Patterns',
    links: [
      { to: '/learn-solidity/defi-patterns/amm-basics', label: 'AMM basics', difficulty: 'advanced' },
      { to: '/learn-solidity/defi-patterns/liquidity-pools', label: 'Liquidity pools', difficulty: 'advanced' },
      { to: '/learn-solidity/defi-patterns/token-swaps', label: 'Token swaps', difficulty: 'advanced' },
    ]
  },
  {
    title: 'Production',
    links: [
      { to: '/learn-solidity/production/deploying-to-testnet', label: 'Deploying to testnet', difficulty: 'intermediate' },
      { to: '/learn-solidity/production/verifying-contracts', label: 'Verifying contracts', difficulty: 'intermediate' },
      { to: '/learn-solidity/production/connecting-to-frontends', label: 'Connecting to frontends', difficulty: 'intermediate' },
      { to: '/learn-solidity/production/auditing-your-contracts', label: 'Auditing your contracts', difficulty: 'advanced' },
    ]
  }
]
</script>
