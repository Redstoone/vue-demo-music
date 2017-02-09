import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import routes from './config/routes'
import api from './config/api'
import store from './config/store'

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.prototype.$api = api

const router = new VueRouter({routes})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
