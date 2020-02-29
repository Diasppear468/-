import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';//引入ViewUI
import 'view-design/dist/styles/iview.css';//引入ViewUI样式


Vue.config.productionTip = false
Vue.use(ViewUI);//挂载全局

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
