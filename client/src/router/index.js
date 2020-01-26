import Vue from 'vue'
import Router from 'vue-router'
import friendFinder from '../components/friendFinder'
import * as VueGoogleMaps from "vue2-google-maps";
import login from "../components/login"
import create from "../components/create"
import home from "../components/home"
import VueCookie from 'vue-cookie'
import notfound from '../components/notfound'

Vue.use(Router)
Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDb38eOeort7qc_U56E6esfIcpnXEBZzho",
      libraries: "places" // necessary for places input
    }
  });
  Vue.use(VueCookie);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/friendFinder',
            name: 'FriendFinder',
            component: friendFinder
        },
        {
            path: '/login',
            name: 'Login',
            component: login
        },
        {
            path: '/create',
            name: 'Create',
            component: create
        },
        {
            path: '/home',
            name: 'Home',
            component: home
        },
        {
            path: '*',
            name: 'NotFound',
            component: notfound,
         }
    ]
})