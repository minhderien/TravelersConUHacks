import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import {store} from './store/store'

Vue.config.productionTip = false;


new Vue({
    router,
    render: h => h(App),
    vuetify,
    store
}).$mount('#app')


