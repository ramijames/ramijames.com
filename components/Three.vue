<template>
  <TresCanvas window-size preset="realistic" shadows>
    <TresPerspectiveCamera :position="[11,11,11]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      cast-shadow
      :position="[0, 2, 0]"
      :intensity="1"
    />
    <TresMesh
      receive-shadow
      :position="[2, -2, 0]"
    >
      <TresSphereGeometry  />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
  </TresCanvas>
</template>
<script lang="ts" setup>

import { TresCanvas } from '@tresjs/core'

</script>