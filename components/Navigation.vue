<template>
  <nav class="main-nav">
    <section class="core">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/products">Products</nuxt-link>
      <nuxt-link to="/thoughts">Thoughts</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
    </section>
  </nav>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'

export default {
  setup() {
    const themeStore = useThemeStore()

    onMounted(() => {
      watch(
        () => themeStore.currentTheme,
        (newTheme, oldTheme) => {
          if (typeof document !== 'undefined') {
            document.body.classList.remove(`${oldTheme}`)
            document.body.classList.add(`${newTheme}`)
          }
        },
        { immediate: true }
      )
    })

    return {
      currentTheme: computed(() => themeStore.currentTheme)
    }
  },
}
</script>

<style scoped>

.main-nav {
  position: relative;
  width:100%;
  border-bottom: 1px solid black;
}

@media screen and (max-width: 768px) {
  .main-nav {
    width:100%;
    top:0px;
    height:66px;
    position:relative;
    margin:0;
    padding:0;
    text-align: center;
  }

      .main-nav a {
        width:50%;
        font-size: .8rem;
        margin:0;
        padding: 0;
        text-align: center;
        justify-content: center;
      }
}

.core {
  display:flex;
  justify-content: space-between;
  width: 100%;
  gap:2rem;
  height:48px;
  align-items: center;
}

    .core a {
      text-decoration: none;
      color: #000;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      align-items: center;
      width:25%;
    }

        .core a:hover {
          border-color: black;
          color:black;
        }

        .dark .core a:hover {
          border-color: white;
          color:white;
        }

      @media screen and (max-width: 768px) {
        .core {
          width:100%;
          position:fixed;
          background-color: white;
          bottom:0;
          height:54px;
        }

        .dark .core {
          background-color: black;
        }

        .core a {
          width:50%;
          font-size: .8rem;
          margin:0;
          padding: 0;
          text-align: center;
          justify-content: center;
        }

        .core a:hover {
          background-color: transparent;
        }

        .dark .core a:hover {
          background-color: transparent;
          color: white;
        }
      }

  .main-nav a,
  .theme-switcher {
    color: black;
    display:flex;
    justify-content: center;
    height:100%;
    border: bottom 1px solid transparent;
  }
  
  .dark .main-nav a,
  .dark .theme-switcher {
    color: white;
    display:flex;
    justify-content: center;
  }

.extras {
  display:flex;
  flex-direction: row;
  gap:.3rem;
  height:100px;
  justify-content: center;
}

    .extras.left {
      position:absolute;
      left:1rem;
      top:0;
      display:flex;
      justify-content: flex-start;
    }

    .extras.right {
      position:absolute;
      right:1rem;
      top:0;
      display:flex;
      justify-content: flex-end;
    }

    @media screen and (max-width: 768px) {
      .extras.left {
        position:absolute;
        left:0;
        width:50%;
        display:flex;
        justify-content: flex-start;
      }

      .extras.right {
        position:absolute;
        right:0;
        width:50%;
        display:flex;
        justify-content: flex-end;
      }

      .extras a, .extras .theme-switcher {
        width:50%;
        height:34px;
        padding:1rem;
        display: flex;
        justify-content: center;
      }
    }

.router-link-active, 
.router-link-exact-active {
  border-bottom:1px solid black;
}

    .dark .router-link-active, 
    .dark .router-link-exact-active {
      border-bottom:1px solid white;
    }

    @media screen and (max-width: 768px) {
      .router-link-active, 
      .router-link-exact-active {
        background:white;
        border:none;
        border-bottom:1px solid black;
        border-radius: 0rem;
      }

          .dark .router-link-active, 
          .dark .router-link-exact-active {
            border:none;
            border-bottom:1px solid white;
            background:black;
            border-radius: 0rem;
          }
    }

</style>