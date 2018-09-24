<template>
  <div class="wrap">
    <Month-Card v-for="(item, $index) in MONTH_POETRIES" :key="item.name"
      :month="$index + 1" :poetry="item.poetry" @click.native="goMonth($index)"></Month-Card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MonthCard from '../components/MonthCard.vue';
import { MONTH_POETRIES } from '../constants';

export default Vue.extend({
  name: 'MonthView',
  data() {
    return {
      MONTH_POETRIES,
    };
  },
  methods: {
    goMonth($index) {
      const now = new Date();
      this.$router.push({
        name: 'month',
        params: {
          date: `${now.getFullYear()}-${$index < 9 ? '0' : ''}${$index + 1}-${now.getDate()}`,
        },
      });
    },
  },
  components: {
    MonthCard,
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #7b96c2;
  > * {
    margin: 20px;
    cursor: pointer;
  }
}
</style>
