<template>
  <main class="general-main">
    <section class="explanation">
      <h1 class="products-bold">Every product has its story</h1>
      <h4>I like to build in public, with a short iteration cycle and direct feedback from users.</h4>
      <p>Each product shifts and changes as it achieves either market fit or contribution to the dustbin of history.</p>
    </section>
    <section class="general-content">
      <!-- <section class="product-bar">
        <div class="filters">
          <button class="small selected">All</button>
          <button class="small">Current</button>
          <button class="small">Past</button>
        </div>
      </section> -->
      <section class="stories">
        <nuxt-link class="single-story" v-for="product in products" :key="product.title" :to="product.slug">
          <div class="book">
            <div class="cover">
              <div class="color" :style="{ backgroundColor: product.color }"></div>
              <div class="single-image">
                <img :src="product.image" alt="Product Image">
              </div>
            </div>
            <div class="pages"></div>
          </div>
          <div class="intro">The story of</div>
          <div class="single-title">{{ product.title }}</div>
          <div class="single-description">{{ product.description }}</div>
        </nuxt-link>
      </section>
    </section>
  </main>
</template>

<script>

export default {
  data() {
    return {
      products: [
          {
            title: 'Crisp Tools',
            description: 'A collection of useful tools for designers and developers',
            image: '/crisptools.jpg',
            status: 'current',
            slug: '/products/crisp-tools',
            color: '#D5E7FD'
          },
          {
            title: 'Random Sandwich',
            description: 'A social network based around randomly generated objects',
            image: '/randomsandwich.jpg',
            status: 'current',
            slug: '/products/random-sandwich',
            color: '#CCA32E'
          },
          {
            title: 'Doodledapp',
            description: 'No-code smart contract development and deployment',
            image: '/doodledapp.jpg',
            status: 'past',
            slug: '/products/doodledapp',
            color: '#3E74FF'
          },
          {
            title: 'Ultra',
            description: 'Tokenized gaming platform',
            image: '/ultra.jpg',
            status: 'past',
            slug: '/products/ultra',
            color: '#2E2667'
          },
          {
            title: 'Scatter',
            description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
            image: '/scatter.jpg',
            status: 'past',
            slug: '/products/scatter',
            color: '#0899FE'
          }
        ]
    }
  }

}

</script>

<style scoped>

h1.products-bold {
  text-align: left;
  font-weight: bold;
  margin:0;
  padding:0 0 0.5rem;
  z-index: 200;
  animation: animatedBackground 5s ease-in-out infinite;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  background-image: linear-gradient(90deg, rgb(161, 49, 231), #d81515, #7523e1, rgb(161, 49, 231)) !important;
  background-size: 300% !important;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

    @media screen and (max-width: 768px) {
      h1.thoughts-bold {
        font-size: 4rem;
        line-height: 3.5rem;
        padding:0 0 1rem;
      }
      
    }

    @keyframes animatedBackground {
      0% {
        background-position:0 50%;
      }
      50% {
        background-position:50% 50%;
      }
      100% {
        background-position:0 50%;
      }
    }

    .product-bar {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding:1rem;
      position: -webkit-sticky;
      position: sticky;
      top:80px;
      z-index: 200;
    }

        .product-bar .filters {
          display: flex;
          gap: 0.5rem;
        }

.stories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap:2rem;
  padding:1rem 4rem 8rem;
}

    @media screen and (max-width: 1000px) {
      .stories {
        display: grid;
        grid-template-columns: 1fr;
        gap:2rem;
        padding:2rem;
      }
    }

    .single-story {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
    }

        .book {
          position: relative;
          margin-bottom: 1rem;
          border-radius: 2px 0 0 2px;
          box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
                      0 18px 26px rgba(34, 17, 84, 0.16);
        }

            .single-story:hover .book {
              transform:  rotateX(5deg)
                          scale(1.05)
                          rotate(-5deg);
              transition: all 0.35s ease-in-out;
              box-shadow: 0 8px 6px rgba(0,0,0,0.24), 
                      0 28px 36px rgba(34, 17, 84, 0.10);
            }

            .book::after {
              content: '';
              position: absolute;
              top:0;
              left:0;
              width:20px;
              height:100%;
              background: linear-gradient(-90deg, #181818 0%, rgb(26, 26, 26) 100%);
              border-radius: 2px 0 0 2px;
              z-index: 12;
              border-right: 2px solid rgba(255, 255, 255, 0.224);
            }

            .cover {
              width:200px;
              height:250px;
              border-radius: 4px 12px 12px 4px;
              box-shadow: 1px 2px 2px rgba(0,0,0,0.44);
              z-index: 10;
              position: relative;    
              background:black;
              /* background-image: url('/composition-bg.jpg'); */
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              /* border:1px solid rgba(0,0,0,0.1); */
              box-shadow: inset 0 0 6px 4px rgba(255, 255, 255, 0.1);
              overflow: hidden;
            }

                .color {
                  width:200px;
                  height:250px;
                  border-radius: 4px 12px 12px 4px;
                  mix-blend-mode: screen;
                  z-index: 11;
                  position: absolute; 
                  opacity: 0.4;
                }

                .single-image {
                  width:calc(60% + 20px);
                  margin:0 auto;
                  height:100px;
                  top:20px;
                  left:10px;
                  position: relative;
                  z-index: 11;
                  border-radius: 4px;
                  border:4px solid rgba(255,255,255,0.2);
                }

                    .single-image img {
                      height: 100%;
                      width:100%;
                      object-fit: fill;
                      border: 0;
                      padding: 0;
                      border-radius: 2px;
                    }

            .pages {
              position: absolute;
              top:2px;
              left:8px;
              rotate:1deg;
              width:98%;
              height:99%;
              border-radius: 2px 8px 8px 2px;
              background: linear-gradient(90deg, #ffffffb6 0%, rgba(255, 255, 255, 1) 100%);
              box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
                      0 8px 6px rgba(0,0,0,0.06),
                      0 12px 12px rgba(0,0,0,0.06);
              z-index: 9;
            }

                .single-story:hover .pages {
                  transform: translate(5px);
                  transition: transform 0.35s ease-in-out;
                }

                .single-story:hover .pages::after {
                  transform: translate(5px) rotate(3deg);
                  transition: transform 0.35s ease-in-out;
                }

                .single-story:hover .pages::before {
                  transform: translate(8px) rotate(-3deg);
                  transition: transform 0.35s ease-in-out;
                }

            .pages::after {
              content: '';
              position: absolute;
              top:1px;
              left:5px;
              rotate:-1deg;
              width:98%;
              height:99%;
              border-radius: 2px 8px 8px 2px;
              background: linear-gradient(90deg, #ffffffb6 0%, rgba(255, 255, 255, 1) 100%);
              box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
                      0 8px 6px rgba(0,0,0,0.06),
                      0 12px 12px rgba(0,0,0,0.06);
              z-index: 8;
            }

            .pages::before {
              content: '';
              position: absolute;
              top:1px;
              left:5px;
              rotate:-1deg;
              width:98%;
              height:99%;
              border-radius: 2px 8px 8px 2px;
              background: linear-gradient(90deg, #ffffffb6 0%, rgba(255, 255, 255, 1) 100%);
              box-shadow: 0 2px 1px rgba(0,0,0,0.24), 
                      0 8px 6px rgba(0,0,0,0.06),
                      0 12px 12px rgba(0,0,0,0.06);
              z-index: 8;
            }

    .intro {
      font-size: .8rem;
      opacity: 0.5;
      margin-top:0.5rem;
      text-transform: uppercase;
      letter-spacing: .1rem;
      text-decoration: none;
    }

    .single-title {
      font-size: 1.25rem;
      margin-bottom:0.5rem;
      text-align: center;
      text-decoration: none;
    }

    .single-description {
      font-size: .8rem;
      opacity: 0.5;
      margin:0 2rem 2rem;
      text-align: center;
      text-decoration: none;
    }

    .dark .single-description,
    .dark .single-title,
    .dark .intro {
      color: #fff;
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