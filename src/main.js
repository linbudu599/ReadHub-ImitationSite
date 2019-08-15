// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import topic from './components/topic.vue'
import jobs from './components/jobs.vue'
import itemCom from './components/itemCom.vue'
import sideBar from './components/sideBar.vue'
import {timeBefore,axiosDeal,confirmHashVal} from '../static/publicFuncs'
import errRouter from '@/components/errRouter'
export var bus = new Vue();



Vue.config.productionTip = false;
Vue.prototype.timeBefore = timeBefore;
// Vue.prototype.currentDots = currentDots;
Vue.prototype.axiosDeal = axiosDeal;
Vue.prototype.confirmHashVal = confirmHashVal;

Vue.component('topic',topic);
Vue.component('jobs',jobs);
Vue.component('itemCom',itemCom);
Vue.component('sideBar',sideBar);
Vue.component('errRouter',errRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  components: { App },
  template: '<App/>' 
})
