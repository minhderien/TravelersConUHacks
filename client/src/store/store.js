import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: '',
        country: '',
        message: '',
    },
    mutations: {
        changeUser(state, user){
            state.user = user
        },
        changeCountry(state, user){


            state.country = user;
        },
        setMessage(state, message) {
            state.message = message;
        }
    },
    getters: {
        user: state => state.user,
        country: state => state.country,
        message: state => state.message,
    }

})