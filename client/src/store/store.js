import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: '',
        country: '',
        activeChat: '',
        activeChatId: null,
        message: '',
    },
    mutations: {
        changeUser(state, user){
            state.user = user
        },
        changeCountry(state, user){


            state.country = user;
        }
    },
    getters: {
        user: state => state.user,
        country: state => state.country
    }

})