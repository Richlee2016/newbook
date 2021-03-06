// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Plugin from '@/assets/plugin'
import RScroll from '@/assets/plugin/rscroll'
Vue.config.productionTip = false
Vue.use(Plugin);
Vue.use(RScroll);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})