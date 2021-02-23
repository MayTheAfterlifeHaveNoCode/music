import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import "../src/font/iconfont.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: function() {
    return {
      isShowLoading: false
    }
  }
}).$mount('#app')
