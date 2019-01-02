import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import {store} from './store.js'




Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  store:store,
}).$mount('#app')
