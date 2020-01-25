import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: '',
        country: '',
        activeChat: '',
        activeChatId: null,
    },
    mutations: {
        changeUser(state, user){
            state.user = user
        },
        changeCountry(state, user){


            state.country = user;
        },
        changeActiveChat(state, val){
           
            state.activeChat = val;
        },
        changeActiveChatId(state, val){
           
            state.activeChatId = val;
        }
    },
    getters: {
        user: state => state.user,
        country: state => state.country,
        activeChat: state => state.activeChat,
        activeChatId: state => state.activeChatId
    }

})