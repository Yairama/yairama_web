<template>
  <img alt="loli gif" src="./assets/loli-dance.gif">
  <MainComponent></MainComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainComponent from './components/MainComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainComponent
  }
});
</script>

<style>

</style>
