<template>
  <main id="show-case">
    <aside id="work-list">
      <div class="generic-title">Recent work</div>
      <ul>
        <li class="selected">Project 1</li>
        <li>Project 2</li>
        <li>Project 3</li>
        <li>Project 4</li>
        <li>Project 5</li>
      </ul>
    </aside>
    <section id="work-preview">
      <img src="/products/scatter/scatter-main-mobile.png" alt="" class="show-case-image">
      <div class="work-bar">
        <Button text="View Project" size="small" link="" />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">

@import './assets/variables';

#show-case {
  display: flex;
  flex-direction: row;
  max-height:600px;
  max-width: 1200px;
  width:100%;
  margin:$spacing-lg auto;
  box-shadow: $main-shadow;
  border-radius: $br-md;
  overflow:hidden;
  z-index: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-height:100%;
    border-radius: 0;
  }
}

#work-list {
  background: rgba(255, 255, 255, 0.05);
  border:1px solid rgba($white,.8);
  border-right:0;
  backdrop-filter: blur(20px);
  padding:$spacing-md 0 $spacing-md $spacing-md;
  z-index: 1;
  position: relative;
  width:25%;
  border-radius: $br-md 0 0 $br-md;

  @media screen and (max-width: 768px) {
    width:100%;
  }
}

    #work-list ul {
      list-style-type: none;
      padding:0;
      margin:$spacing-sm 0;

      li {
        padding: 0 0 $spacing-xxs 0;
        cursor: pointer;
        color: rgba(0,0,0,0.5);
        text-decoration: none;

        &.selected {
          color: $blue;
        }
      }
    }

    .dark #work-list {
      background: rgba(0,0,0, 0.25);
      border:1px solid rgba($white,.1);

      li {
        color: rgba(255,255,255,0.5);

        &.selected {
          color: $blue-light;
        }
      }
    }

#work-preview {
  background: rgba(0,0,0, 0.05);
  backdrop-filter: blur(20px);
  z-index: 1;
  width:75%;

  @media screen and (max-width: 768px) {
    width:100%;
  }
}

    .show-case-image {
      width:100%;
      object-fit: cover;
      object-position: center;

      @media screen and (max-width: 768px) {
        width:100%;
      }
    }

    .work-bar {
      display:flex;
      justify-content: flex-end;
      width:100%;
      align-items: center;
      padding: $spacing-sm;
      position: absolute;
      bottom: 0;
      z-index: 2;
      backdrop-filter: blur(40px);
      background: rgba($blue,0.1);
      border-radius: 0 0 $br-md 0;

      @media screen and (max-width: 768px) {
        background: rgba($blue,0.2);
        border-radius: 0;
      }
    }

</style>