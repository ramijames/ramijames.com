<template>
  <Separator />
  <section id="types-of-designs" class="general-main">
    <h2>Hassle-free designs for apps, websites, landing pages & more</h2>
    <div class="types">
      <div class="single-type">Branding</div>
      <div class="single-type">Design Systems</div>
      <div class="single-type">Online apps</div>
      <div class="single-type">Mobile apps</div>
      <div class="single-type">Iconography</div>
      <div class="single-type">Illustrations</div>
      <div class="single-type">Pitch decks</div>
      <div class="single-type">Logos</div>
    </div>

    <div class="work-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
</template>

<style scoped lang="scss">

@import './assets/variables';

#types-of-designs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;

  h2 {
    margin-top: 0;
    text-align: center;
  }

  .types {
    display:flex;
    flex-direction: row;
    gap: $spacing-xs;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    flex-wrap: wrap;

    .single-type {
      padding: $spacing-sm $spacing-md;
      border-radius: $br-xl;
      background-color: $blue;
      color: $white;
      font-size: $font-size-md;

      @media screen and (max-width: 1000px){
        padding: $spacing-xs $spacing-sm;
        font-size: $font-size-sm;
      }
    }
  }

}

.work-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  grid-template-rows: repeat(4, 1fr); 
  gap: $spacing-md;
  grid-auto-flow: row;
  grid-template-areas:
    "one-top two-top three-top four-top"
    "one-top two-bottom three-top four-bottom"
    "one-top two-bottom three-top four-bottom"
    "one-bottom two-bottom three-bottom four-bottom";
  width: 100%;
  min-height: 65vh;

  @media screen and (max-width: 1000px){
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $spacing-md;
    min-height: auto;

    div {
      width: calc(50% - $spacing-md / 2);
      height: 200px;
      background-color: $blue;
      border-radius: $br-lg;
    }
  }

  div:nth-child(1) { 
    grid-area: one-top; 
    background-color: $blue;
    border-radius: $br-lg;
  }

  div:nth-child(2) { 
    grid-area: one-bottom; 
    background-color: $blue;
    border-radius: $br-lg;
  }

  div:nth-child(3) { 
    grid-area: two-top; 
    background-color: $blue;
    border-radius: $br-lg;
  }

  div:nth-child(4) { 
    grid-area: two-bottom; 
    background-color: $blue;
    border-radius: $br-lg;
  }

  div:nth-child(5) { 
    grid-area: three-top; 
    background-color: $blue;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

  div:nth-child(6) { 
    grid-area: three-bottom; 
    background-color: $blue;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

  div:nth-child(7) { 
    grid-area: four-top; 
    background-color: $blue;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

  div:nth-child(8) { 
    grid-area: four-bottom; 
    background-color: $blue;
    border-radius: $br-lg;
    
    @media screen and (max-width: 1000px){
      display:none;
    }
  }

}

.one-top { grid-area: one-top; }
.one-bottom { grid-area: one-bottom; }
.two-top { grid-area: two-top; }
.two-bottom { grid-area: two-bottom; }
.three-top { grid-area: three-top; }
.three-bottom { grid-area: three-bottom; }
.four-top { grid-area: four-top; }
.four-bottom { grid-area: four-bottom; }

.one { grid-area: one; }
.two { grid-area: two; }
.three { grid-area: three; }
.four { grid-area: four; }

</style>