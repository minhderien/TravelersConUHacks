import Vue from 'vue'
import Router from 'vue-router'
import profile from '../components/profile'

import login from "../components/login"
import create from "../components/create"


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/Profile',
            name: 'Profile',
            component: profile
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
        }
    ]
})