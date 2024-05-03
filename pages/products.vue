<template>
  <main class="products-main">
    <!-- 
      I want to be able to see:
        - A list of products that I'm currently working on
        - A list of products that I've worked on in the past
        - For each product there should be an enticing preview which links to a product page

        Each product page should have:
          - Product title
          - Product pitch in one sentence, 10 words or less
          - A verbose description of the product
          - A link to the live product
          - A link to the Github repo
    
    -->
    <h1>Current Products</h1>
    <p>I like to build in public, with a short iteration cycle and feedback from users.</p>
    <div class="single-product">
      <p><strong>CrispTools.dev</strong></p>
      <p><small>A collection of useful tools for designers and developers.</small></p>
      <section class="button-links">
        <a class="button small" href="https://crisptools.dev/">Live</a>
        <a class="button small" href="https://github.com/ramijames/CrispTools">Github</a>
      </section>
    </div>
    <div class="single-product">
      <p><strong>Random-sandwich.com</strong></p>
      <p><small>A community of sandwich lovers who are coming together to find the weirdest, most unique sandwiches of all time.</small></p>
      <section class="button-links">
        <a class="button small" href="https://crisptools.dev/">Live</a>
        <a class="button small" href="https://github.com/ramijames/CrispTools">Github</a>
      </section>
    </div>
  </main>
</template>

<style scoped>

  .products-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .single-product {
    margin: 2rem 0;
  }

  .button-links {
    display: flex;
    gap:0.5rem;
  }
</style>