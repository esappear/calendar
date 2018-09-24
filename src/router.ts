import VueRouter from 'vue-router';
import MonthView from './pages/MonthView.vue';
import YearView from './pages/YearView.vue';

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: MonthView, name: 'home'},
    { path: '/month/:date', component: MonthView, name: 'month'},
    { path: '/year', component: YearView, name: 'year' },
  ],
});