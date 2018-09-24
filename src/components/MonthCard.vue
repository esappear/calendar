<template>
  <div class="month-card" :class="[monthCardClass]">
    <div class="img"></div>
    <h2>{{month | month | maxLength(2)}}</h2>
    <div class="mainWrap">
      <p v-for="item in poetries" :key="item">{{item}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import month from '../filters/month';
import maxLength from '../filters/maxLength';

export default Vue.extend({
  data() {
    return {

    };
  },
  props: {
    month: Number,
    poetry: String,
  },
  computed: {
    poetries() {
      return this.poetry.split('，');
    },
    monthCardClass() {
      return `month-card-${this.month}`;
    }
  },
  filters: {
    month,
    maxLength,
  },
});
</script>

<style lang="scss" scoped>
.month-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 500px;
  border-radius: 40px;
  padding: 50px 45px 10px;
  background-color: #ffffff;
  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: FZQKBYSJW;
  > .img {
    width: 180px;
    height: 180px;
    border-radius: 100%;
    margin-bottom: 40px;
    overflow: hidden;
  }
  > h2 {
    font-size: 28px;
    line-height: 32px;
    font-weight: normal;
    width: 20px;
  }
  > .mainWrap {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
    > p {
      width: 20px;
      font-size: 12px;
      line-height: 1.42;
      color: #7f7f7f;
      position: relative;
      &::before {
        content: '。';
        color: red;
        position: absolute;
        font-size: 18px;
        line-height: 18px;
        font-family: TpldKhangXiDictTrial;
      }
      &:first-child {
        &::before {
          right: -10px;
          top: 0;
        }
      }
      &:last-child {
        &::before {
          right: 0;
          top: 70px;

        }
      }
    }
  }
}

@mixin month-card($month) {
  .month-card-#{$month} {
    > .img {
      background: url('../assets/img-#{$month}.svg') center bottom no-repeat;
      background-size: cover;
    }
  }
}

@for $i from 1 to 13 {
  @include month-card($i);
}
</style>
