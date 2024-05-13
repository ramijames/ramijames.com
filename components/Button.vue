<template>
  <div class="button">
    <div class="button__content">
      <div class="button__text">{{ text }}</div>
    </div>
    <!-- <div class="front">{{ text }}</div> -->
  </div>
</template>

<script>

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      default: 'Button'
    }
  }
}

</script>

<style scoped lang="scss">
/*
.button {
  text-decoration: none;
  border:0;
  margin:0;
  cursor: pointer;
  display:inline-block;
  position: relative;
  height:54px;
  border:1px solid #888888;
  outline:none;
  background-color:#f4f5f6;
  border-radius: 0.3rem;
  box-shadow:  -2px -7px 12px #ffffff, -2px -3px 5px #ffffff, -7px 0px 10px #ffffff, 2px 7px 8px rgba(0,0,0,0.2);
  transition: .13s ease-in-out;
  cursor:pointer;
}

    .content {
      position:relative;
      display:flex;
      
      padding:0rem 2rem;
      width:calc(100% - 4rem);
      height:100%;
      box-shadow:inset 0px -8px 0px #dddddd, 0px -8px 0px #f4f5f6;
      border-radius: 0.3rem;
      transition: .13s ease-in-out; 
      
      z-index:1;
    }
*/

/* .button {
  position:relative;
  padding:0;
  display:inline-block;
  outline:none;
  background-color:#f6f3f7;
  border-radius: .3rem;
  transition: .06s ease-in-out;
  cursor:pointer;
  z-index: 2500;

  &:active {
    box-shadow:none;
    .button__content{
      box-shadow: none;
      .button__text, .button__icon{
        transform:translate3d(0px, 0px, 0px);
      }
    }
  }

  &:hover {
    .button__content {
      background-color:#6b3190;
      box-shadow:inset 0px -4px 0px #281335, 0px -5px 0px #6b3190, 0px -7px 0px #713596;
    }
    .button__text {
      transform:translate3d(0px, -6px, 0px);
    }
  }
  
  &__content {
    position:relative;
    display:flex;
    flex-direction: row;
    justify-content:center;
    
    padding:1rem 2rem;
    width:100%;
    height:100%;
    
    box-shadow:inset 0px -2px 0px #281335, 0px -3px 0px #572774, 0px -5px 0px #713596;
    border-radius: .2rem;
    transition: .06s ease-in-out; 
    
    z-index:1;

    background: #572774;
  }

  &__text {
      position:relative;
    
      transform:translate3d(0px, -4px, 0px);
      margin:0;

      text-align:center;
      font-weight: bold;
      font-size: 1rem;
      color: #f7eaff;
      text-shadow: 0px 2px 0px rgba(0,0,0,0.35);
      transition: .06s ease-in-out; 
  }
} */


.button {
  position:relative;
  padding:2rem 4rem;
  display:inline-block;
  outline:none;
  background-color:#f6f3f7;
  border-radius: .3rem;
  transition: .06s ease-in-out;
  cursor:pointer;
  z-index: 2500;
  background-color: rgb(161, 49, 231);
  backdrop-filter: blur(6px);
  color:white;
  text-shadow:0px 2px 1px rgba(0,0,0,0.3);
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  mix-blend-mode: multiply;
  perspective: 100em;
  transform-style: preserve-3d;
  font-size:1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  
  &:after {
    transform-style: preserve-3d;
    transform-origin: top;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(10deg);
    height: 100%;
    border-radius: .3rem;
    background: #d81515;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    mix-blend-mode: screen;
  }

  &:before {
    transform-style: preserve-3d;
    transform-origin: top;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(-10deg);
    height: 100%;
    border-radius: .3rem;
    background: #7523e1;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    mix-blend-mode: overlay;
  }
}

.dark .button {
  mix-blend-mode: screen;
}

.button:hover,
.button:hover:after,
.button:hover:before {
  transform: rotate(0deg);
  background-color: rgb(161, 49, 231);
}

</style>