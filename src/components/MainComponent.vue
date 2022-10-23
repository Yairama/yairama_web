<template>
<div>

  <h3>La bebecita bebelin UwU</h3>
  <h1>Muevete con WASD, sube y baja con Ctrl o SPACE y mueve la camara con click del mouse :3</h1>
  <canvas id="MainCanvas"></canvas>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {BasicScene} from '@/babylon_core/BasicScene';

export default defineComponent({
  name: 'MainComponent',
  mounted() {
    const canvas = document.querySelector("canvas")!;
    new BasicScene(canvas);
    console.log("Main component mounted")
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

canvas {
  width: 70%;
  height: 70%;
}

</style>
