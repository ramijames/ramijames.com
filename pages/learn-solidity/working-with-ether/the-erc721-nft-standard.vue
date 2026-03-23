<template>
  <section class="learnthreejs-layout">
    <LearnSolidityNav :innerNav="true" />
    <main>
      <PageHeader title="The ERC-721 NFT standard" tagline="Non-fungible tokens — each one unique, each one provably owned on-chain." />

      <main class="w-content page-top">
        <section class="content">

          <h2>What makes a token non-fungible?</h2>

          <p>Unlike ERC-20 where every unit is identical, ERC-721 tokens each have a unique <code>tokenId</code>. Token #1 is provably different from token #42. Ownership is tracked per-token, not per-balance.</p>

          <p>NFTs have been used for digital art, gaming items, real estate deeds, and protocol positions — anywhere unique provable ownership is useful. Applications like <a href="https://doodledapp.com" target="_blank" rel="noopener">Doodledapp.com</a> allow you to import the standard contracts and use NFTs to represent unique positions and collectibles within their ecosystem.</p>

          <h2>The ERC-721 interface</h2>

          <CodeBlock lang="solidity" :code="`interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);

    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}`" />

          <h2>Implementing with OpenZeppelin</h2>

          <CodeBlock lang="solidity" :code="`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DoodleNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint256 public constant MINT_PRICE = 0.05 ether;
    uint256 public constant MAX_SUPPLY = 10_000;

    constructor() ERC721('Doodle Collection', 'DOODLE') Ownable(msg.sender) {}

    function mint(string memory tokenURI) external payable returns (uint256) {
        require(msg.value >= MINT_PRICE, 'Insufficient ETH');
        require(_nextTokenId < MAX_SUPPLY, 'Sold out');

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}('');
        require(success);
    }
}`" />

          <h2>Token metadata</h2>

          <p>NFT metadata (name, image, attributes) is typically stored off-chain as JSON, with a URI stored on-chain pointing to it. The ERC-721 Metadata extension adds <code>tokenURI(uint256 tokenId)</code> for this purpose.</p>

          <CodeBlock lang="solidity" :code="tokenUriExample" />

          <h2>safeTransferFrom vs. transferFrom</h2>

          <p><code>safeTransferFrom</code> checks that the recipient can handle NFTs — if the recipient is a contract, it must implement <code>IERC721Receiver</code>. This prevents tokens from being permanently locked in contracts that aren't designed to handle them. Always use <code>safeTransferFrom</code> unless you have a specific reason not to.</p>

        </section>
      </main>
    </main>
  </section>

  <LearnThreejsBottomNav
    prevLink="/learn-solidity/working-with-ether/the-erc20-standard"
    prevText="The ERC-20 standard"
    nextLink="/learn-solidity/security/common-vulnerabilities"
    nextText="Common vulnerabilities"
  />

  <Footer />
</template>

<script setup>
const tokenUriExample = `// tokenURI returns something like:
// ipfs://Qm.../1
// which resolves to JSON:
{
  "name": "Doodle #1",
  "description": "A unique doodle",
  "image": "ipfs://Qm.../images/1.png",
  "attributes": [
    { "trait_type": "Background", "value": "Blue" },
    { "trait_type": "Eyes", "value": "Laser" }
  ]
}`

useHead({ title: 'The ERC-721 NFT standard' })
useSeoMeta({
  title: 'The ERC-721 NFT standard',
  ogTitle: 'The ERC-721 NFT standard',
  description: 'Non-fungible tokens — each one unique, each one provably owned on-chain.',
  ogDescription: 'Non-fungible tokens — each one unique, each one provably owned on-chain.',
  ogImage: '/learn-solidity/cover.png',
  url: 'https://www.ramijames.com/learn-solidity/working-with-ether/the-erc721-nft-standard',
  twitterTitle: 'The ERC-721 NFT standard',
  twitterDescription: 'Non-fungible tokens — each one unique, each one provably owned on-chain.',
  twitterImage: '/learn-solidity/cover.png',
  twitterCard: 'summary_large_image'
})
</script>
