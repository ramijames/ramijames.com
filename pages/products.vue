<template>
  <main class="products-main">
    <section class="explanation">
      <h1>Endless fascination with the process of building digital products</h1>
      <p>I like to build in public, with a short iteration cycle and direct feedback from users. Each product shifts and changes as it achieves either market fit or contribution to the dustbin of history.</p>
      <p>Each product has its own story and reason for being. In truth, we are all just along for the ride.</p>
    </section>
    <section class="products">
      <section class="product-bar">
        <div><input v-model="products" placeholder="Filter by name"></div>
        <div class="filters">
          <button class="small">All</button>
          <button class="small">Current</button>
          <button class="small">Past</button>
        </div>
      </section>
      <nuxt-link to="/products/crisptools" class="single-product crisp-tools">
        <div class="product-panel">
          <p class="product-title">Crisp Tools</p>
          <p class="product-description">A collection of useful tools for designers and developers</p>
        </div>
      </nuxt-link>
      <nuxt-link to="/products/random-sandwich" class="single-product random-sandwich">
        <div class="product-panel">
          <p class="product-title">Random Sandwich</p>
          <p class="product-description">A social network based around randomly generated objects</p>
        </div>
      </nuxt-link>

    </section>
    <!-- 
      I want to be able to see:
        - An brief explanation of what my process is like
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
    <!-- <h1>Current Products</h1>
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
    </div> -->
  </main>
</template>

<style scoped>

.products-main {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 2rem;
  padding:0 8rem;
}

    .product-bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding:1rem;
      margin-bottom: 1rem;
      position: -webkit-sticky;
      position: sticky;
      top:120px;
      backdrop-filter: blur(10px);
      background-color: #ffffffae;
      border-radius: 8px;
      border:1px solid rgba(255,255,255,0.1);
      box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
              0 8px 6px rgba(0,0,0,0.06),
              0 12px 12px rgba(0,0,0,0.06);
      z-index: 200;
    }

        .product-bar .filters {
          display: flex;
          gap: 0.5rem;
        }

        .dark .product-bar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding:1rem;
          margin-bottom: 1rem;
          position: -webkit-sticky;
          position: sticky;
          top:120px;
          backdrop-filter: blur(10px);
          background-color: #160b1da7;
          border-radius: 8px;
          border:1px solid rgba(255,255,255,0.1);
          box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
                  0 8px 6px rgba(0,0,0,0.06),
                  0 12px 12px rgba(0,0,0,0.06);
        }

    .explanation {
      max-width: 500px;
      position: -webkit-sticky;
      position: sticky;
      top:120px;
      
    }

    .explanation h1 {
      opacity: 0.15;
    }

    .products {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
    }

        .dark .products {
          border: 1px solid rgba(255,255,255,0);
        }

.single-product {
  height:400px;
  background-color: rgba(0,0,0,0.1);
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: .3rem;
  box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
              0 8px 6px rgba(0,0,0,0.06),
              0 6px 12px rgba(0,0,0,0.06);
  overflow: hidden;
  text-decoration: none;
  margin-bottom:2rem;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}

    .product-panel {
      display:flex;
      flex-direction: column;
      justify-content: flex-end;
      height:100px;
      padding: 2rem;
      color:white;
      backdrop-filter: blur(5px);
      mask-image: linear-gradient(0deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
    }

        .product-title {
          font-size: 3rem;
          color:white;
          text-shadow: 0 4px 8px rgba(0,0,0,0.24), 0 2px 1px rgba(0,0,0,.4);
          margin:0 0 .2rem;
          font-family: 'Montserrat', sans-serif;
          line-height: 3rem;
        }

        .product-description {
          font-size: 1rem;
          opacity: 0.5;
          color:white;
          text-shadow: 0 4px 8px rgba(0,0,0,0.24), 0 2px 1px rgba(0,0,0,.4);
          font-weight: normal;
          text-decoration: none;
          font-family: 'Open Sans', sans-serif;
        }

    .crisp-tools {
      background-image: url('/crisptools.jpg');
    }

        .crisp-tools .product-panel {
          background: linear-gradient(0deg, #69798db6 0%, rgb(255,255,255, 0) 100%);
        }

    .random-sandwich {
      background-image: url('/randomsandwich.jpg');
    }

        .random-sandwich .product-panel {
          background: linear-gradient(0deg, #745c19ad 0%, rgb(255,255,255, 0) 100%);
        }

.button-links {
  display: flex;
  gap:0.5rem;
}
</style>