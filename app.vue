<template>
  <!-- <Navigation />
  <div class="container">
    <NuxtPage />
  </div> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>

/* Reset */

* {
   margin: 0px;
   padding: 0px;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  background-color: #f0f0f0;
}

/* Typography */

h1 { 
  font-size: 3.051rem; 
  font-family: 'IBM Plex Mono';
}

h2 { 
  font-size: 2.441rem; 
  font-family: 'IBM Plex Mono';
}

h3 { 
  font-size: 1.953rem; 
  font-family: 'IBM Plex Mono';
}

h4 { 
  font-size: 1.562rem; 
  font-family: 'IBM Plex Mono';
}

h5 { 
  font-size: 1.25rem; 
  font-family: 'IBM Plex Mono';
}

p { 
  font-size: 1rem; 
  font-family: 'IBM Plex Mono';
}

small { 
  font-size: 0.8rem; 
  font-family: 'IBM Plex Mono';
}

/* Layout */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

</style>