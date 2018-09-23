<template>
  <div id="app">
    <Calendar v-model="date" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Calendar from './components/Calendar.vue';
import CalendarSvc from './services/calendar';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      date: CalendarSvc.getToday(),
    };
  },
  components: {
    Calendar,
  },
});
</script>

<style>
@font-face {
  font-family: 'TpldKhangXiDictTrial';
  src: url('./fonts/TpldKhangXiDictTrial.otf') format('opentype');
}

#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: TpldKhangXiDictTrial;
  background-color: #fafafa;
}
</style>
