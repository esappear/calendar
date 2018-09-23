<template>
  <div class="calendar" :class="[calendarClass]">
    <div class="left">
      <header class="calendar-header">
        <h1>{{tableData.current[0] | date('YYYY')}}</h1>
        <h2>{{tableData.current[0] | month}}</h2>
      </header>
      <ul class="calendar-table">
        <li v-for="item in weekData" :key="item">{{item}}</li>
        <li v-for="(item, index) in tableData.prev"
          :key="'prev_' + index"
          class="z-sub"
          @click="setSelectedDate(item)"
          :class="[isToday(item) && 'z-today', isSelected(item) && 'z-selected']">{{item | date('D')}}</li>
        <li v-for="(item, index) in tableData.current"
          :key="'current_' + index"
          @click="setSelectedDate(item)"
          :class="[isToday(item) && 'z-today', isSelected(item) && 'z-selected']">{{item | date('D')}}</li>
        <li v-for="(item, index) in tableData.next"
          class="z-sub"
          :key="'next_' + index"
          @click="setSelectedDate(item)"
          :class="[isToday(item) && 'z-today', isSelected(item) && 'z-selected']">{{item | date('D')}}</li>
      </ul>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CalendarSvc from '../services/calendar';
import date from '../filters/date';
import month from '../filters/month';

export default Vue.extend({
  data() {
    return {
      weekData: '日一二三四五六'.split(''),
    };
  },
  props: {
    value: Date,
  },
  computed: {
    tableData() {
      return CalendarSvc.getTableData(this.value);
    },
    calendarClass() {
      const month = this.tableData.current[0].getMonth() + 1;
      return `calendar-${month}`;
    },
  },
  methods: {
    isToday (date: Date): Boolean {
      return +date - this.tableData.today === 0; 
    },
    isSelected (date: Date): Boolean {
      return +date - this.value === 0;
    },
    setSelectedDate(date) {
      this.$emit('input', date);
    },
  },
  filters: {
    date,
    month,
  },
})
</script>


<style lang="scss" scoped>
@import '../styles/reset.css';
$calendarWidth: 800px;
$calendarHeight: 550px;
$picWidth: 297.5px;
$itemWidth: 32.5px;
$itemDivideVertical: 8px;
$itemDivideHorizonal: 12px;
$monthColors: #659994, #f35441, #ed5796, #37bae6, #5a5959, #009688, #00bb63, #54a07e, #682c2a, #f58232, #607d8b, #2ea9df;

.calendar {
  width: $calendarWidth;
  height: $calendarHeight;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  background: white;
  > .left {
    box-sizing: border-box;
    position: relative;
    padding: 55px 60px;
    flex: 1;
    background: white;
    > header {
      margin-bottom: 27px;
      transition: color .3s ease;
    }
  }
  > .right {
    width: $picWidth;
    height: 100%;
    position: relative;
    transition: background .3s ease;
  }
  &::before {
    content: '';
    position: absolute;
    width: 640px;
    height: 440px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -20px;
    filter: blur(35px);
    opacity: .2;
    transition: background-color .3s ease;
  }
}

.calendar-header {
  > h1 {
    font-size: 90px;
    font-weight: normal;
    line-height: 90px;
    opacity: .12;
  }
  > h2 {
    font-size: 42.5px;
    font-weight: normal;
    line-height: 42.5px;
    margin-top: -42.5px;
  }
}

.calendar-table {
  margin: -1*$itemDivideVertical -1*$itemDivideHorizonal;
  > li {
      display: inline-block;
      width: $itemWidth;
      height: $itemWidth;
      margin: $itemDivideVertical $itemDivideHorizonal;
      border-radius: 100%;
      color: #666;
      font-size: 15px;
      line-height: $itemWidth;
      text-align: center;
      cursor: pointer;
      &.z-today {
        color: #666;
      }
      &.z-selected {
        background-color: #666;
        color: white;
      }
      &.z-sub {
        color: #ccc;
      }
    }
}

@mixin calendar($month) {
  $color: nth($monthColors, $month);
  .calendar-#{$month} {
    .calendar-header {
      color: $color;
    }
    .calendar-table {
      > li {
         &:hover, &.z-today {
          color: $color;
        }
        &.z-selected {
          background-color: $color;
          color: white;
        }
      }
    }
    > .right {
      background: url('../assets/img-#{$month}.svg') no-repeat;
      background-size: cover;
    }
    &::before {
      background-color: $color;
    }
  }
}

@for $i from 1 to 13 {
  @include calendar($i);
}
</style>
