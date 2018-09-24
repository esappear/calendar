<template>
  <div class="wrap">
    <div class="link">
      <router-link to="/year">OVERVIEW</router-link>
    </div>
    <Calendar v-model="date" @input="onDateUpdate"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Calendar from '../components/Calendar.vue';
import CalendarSvc from '../services/calendar';
import date from '../filters/date';

export default Vue.extend({
  name: 'MonthView',
  data() {
    return {
      date: CalendarSvc.getToday(),
    };
  },
  components: {
    Calendar,
  },
  methods: {
    onDateUpdate() {
      this.$router.replace(`/month/${date(this.date, 'YYYY-MM-DD')}`);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params && to.params.date) {
        vm.$set(vm, 'date', new Date(`${to.params.date}T00:00:00`));
      }
    });
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  position: relative;
  > .link {
    position: absolute;
    right: 30px;
    top: 30px;
  }
}
</style>
