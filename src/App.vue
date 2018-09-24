<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
  data() {
    return {

    };
  },
});
</script>

<style>
@font-face {
  font-family: 'TpldKhangXiDictTrial';
  src: url('./fonts/TpldKhangXiDictTrial.otf') format('opentype');
}

@font-face {
  font-family: 'FZQKBYSJW';
  src: url('./fonts/FZQKBYSJW.ttf') format('truetype');
}

#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-family: TpldKhangXiDictTrial;
}
</style>
