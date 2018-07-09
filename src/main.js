// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import axios from 'axios'

//plugins
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
//let myChart = this.$echarts.init(document.getElementById('myChart'))
//UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';;

Vue.use(ElementUI);

Vue.config.productionTip = false

require('./mock')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // axios,
  components: { App },
  template: '<App/>'
})
