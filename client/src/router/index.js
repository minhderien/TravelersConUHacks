import Vue from 'vue'
import Router from 'vue-router'
import friendFinder from '../components/friendFinder'

import login from "../components/login"
import create from "../components/create"
import home from "../components/home"

Vue.use(Router)

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
        }
    ]
})