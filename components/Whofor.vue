<template>
  <main id="who-for">
    <h2>
      Who is this for? <span class="highlight">New and existing startups</span> 
      or small to medium companies looking for <span class="highlight">speed</span> and 
      <span class="highlight">next-level design & development</span>.
    </h2>
  </main>
</template>

<style scoped lang="scss">

@import './assets/variables';

#who-for {
  text-align: center;
  margin:$spacing-xxl auto;
  color:$gray-md;
  max-width: 500px;
  width:100%;

  h2 {
    font-size: 3.051rem; 
    line-height: 3.051rem;
  }

  .highlight {
    color:$blue;
  }

  @media screen and (max-width: 768px){
    margin: $spacing-xl $spacing-md;
    max-width: initial;
    width:calc(100% - 4rem);

    h2 {
      font-size: 2.441rem;
      line-height: 2.441rem;
    }
  }
}

.dark #who-for {
  color:$blue-light;

  .highlight {
    color:$gray-light;
  }
}

</style>