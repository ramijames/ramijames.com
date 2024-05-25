<template>
  <div class="randomIcon">
    <svg v-if="selectedSvg === 'svg1'" :class="selectedBackground" viewBox="0 0 104 105" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M79.8198 80.3198C58.5362 101.603 37.4638 115.038 16.1802 93.7548C-5.10336 72.4713 -5.10336 37.9638 16.1802 16.6802C37.4638 -4.60337 71.9713 -4.60337 93.2548 16.6802C114.538 37.9638 101.103 59.0362 79.8198 80.3198Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg2'" :class="selectedBackground" viewBox="0 0 106 102" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M90.0358 77.5869C68.7522 98.8705 47.6797 112.305 26.3962 91.0219C5.11259 69.7383 -11.0677 45.6934 10.2159 24.4099C31.4994 3.12629 68.7521 -9.8736 90.0357 11.41C111.319 32.6935 111.319 56.3033 90.0358 77.5869Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg3'" :class="selectedBackground" viewBox="0 0 103 91" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M90.5936 71.0291C72.7646 88.858 54.4926 99.4926 33.209 78.209C11.9255 56.9254 -16.1326 24.9741 12.9359 15.6898C42.0044 6.40557 63.9392 -11.0608 85.2228 10.2228C106.506 31.5064 108.423 53.2001 90.5936 71.0291Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg4'" :class="selectedBackground" viewBox="0 0 100 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M67.2068 91.0595C42.7571 97.2206 9.35491 93.1871 2.00011 64C-5.35469 34.8129 11.9867 18.8526 40.0001 6.75207C67.2068 -5 89.6453 -2.18714 97.0001 27C104.355 56.1871 91.6565 84.8985 67.2068 91.0595Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg5'" :class="selectedBackground" viewBox="0 0 99 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M69.2067 86.3075C44.757 92.4685 9.89602 75.6647 2.54123 46.4775C-4.81357 17.2904 12.2842 -4.93886 42 2C71.7157 8.93888 88.4284 2.16639 95.7832 31.3535C103.138 60.5406 93.6564 80.1464 69.2067 86.3075Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg6'" :class="selectedBackground" viewBox="0 0 102 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M89.7254 70.0292C71.8964 87.8582 33.3513 91.3128 12.0678 70.0292C-9.21581 48.7456 -0.0684668 30.2843 29 21C58.0685 11.7158 63.0711 -12.0606 84.3547 9.22296C105.638 30.5065 107.554 52.2002 89.7254 70.0292Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg7'" :class="selectedBackground" viewBox="0 0 102 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M65 78C40.5503 84.161 9.3548 98.1871 2 69C-5.3548 39.8129 14.9866 22.1005 43 10C70.2067 -1.75207 92.2473 -6.18716 99.6021 23C106.957 52.1871 89.4497 71.839 65 78Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg8'" :class="selectedBackground" viewBox="0 0 107 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 5C55.8549 -3.16643 71 -2 97.4064 17.9392C123.813 37.8785 88.352 65.7537 61.438 80.1346C35.299 94.1014 13.7019 100.348 3.9531 71.8711C-5.79568 43.394 8.14512 13.1664 32 5Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg9'" :class="selectedBackground" viewBox="0 0 98 91" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8.14617C55.8549 -0.020258 97.4064 -8.82918 97.4064 21.0854C97.4064 51 88.352 68.8999 61.438 83.2808C35.299 97.2476 13.7488 90.4771 4 62C-5.74877 33.5229 8.14513 16.3126 32 8.14617Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg10'" :class="selectedBackground" viewBox="0 0 96 77" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39 2.85584e-06C64.214 1.7537e-06 104.118 23.4421 94.5518 45.2894C73.6169 93.1008 0.440766 81.5485 0.440764 37.1713C0.440762 7.0718 13.786 3.95798e-06 39 2.85584e-06Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg11'" :class="selectedBackground" viewBox="0 0 97 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M67.0479 83.3075C42.5982 89.4685 -3.55541 67 0.382375 43.4776C9 -8.00003 82.7808 -14.6784 93.6243 28.3535C100.979 57.5407 91.4976 77.1465 67.0479 83.3075Z" fill="#D9D9D9"/>
    </svg>

    <svg v-if="selectedSvg === 'svg12'" :class="selectedBackground" viewBox="0 0 81 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39 3.53346e-06C64.214 2.43133e-06 87.5661 34.1528 78 56C57.0651 103.811 0.440766 93.7987 0.440764 49.4215C0.440762 19.322 13.786 4.6356e-06 39 3.53346e-06Z" fill="#D9D9D9"/>
    </svg>


  </div>
</template>

<script>

export default {
  data() {
    return {
      svgs: ['svg1',
             'svg2',
             'svg3',
             'svg4',
             'svg5',
             'svg6',
             'svg7',
             'svg8',
             'svg9',
             'svg10',
             'svg11',
             'svg12'],
      selectedSvg: '',
      backgrounds: [
        'background1',
        'background2',
        'background3',
        'background4',
        'background5',
        'background6',
        'background7',
        'background8',
        'background9',
        'background10',
        'background11',
        'background12'
      ],
      selectedBackground: '',
    };
  },
  created() {
    this.selectedSvg = this.svgs[Math.floor(Math.random() * this.svgs.length)];
    this.selectedBackground = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
  },
};

</script>

<style scoped lang="scss">

@import '../assets/variables';

.randomIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  svg {
    padding: 4px;

    path {
      fill: none;
      stroke-width: 1;
      paint-order: stroke;
    }
  }
}

.background1 {
  path {
    stroke: rgba($blue, 1);
  }
}

.background2 {
  path {
    stroke: rgba($blue-light, 1);
  }
}

.background3 {
  path {
    stroke: rgba($green, 1);
  }
}

.background4 {
  path {
    stroke: rgba($green-light, 1);
  }
}

.background5 {
  path {
    stroke: rgba($pink, 1);
  }
}

.background6 {
  path {
    stroke: rgba($pink-light, 1);
  }
}

.background7 {
  path {
    stroke: rgba($teal, 1);
  }
}

.background8 {
  path {
    stroke: rgba($orange, 1);
  }
}

.background9 {
  path {
    stroke: rgba($yellow, 1);
  }
}

.background10 {
  path {
    stroke: rgba($purple, 1);
  }
}

.background11 {
  path {
    stroke: rgba($purple-light, 1);
  }
}

.background12 {
  path {
    stroke: rgba($teal-light, 1);
  }
}

</style>