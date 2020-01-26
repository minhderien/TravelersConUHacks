import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: '',
        country: '',
        activeChat: '',
        activeChatId: null,
        userId: '',
        users: {},
        message: '',
        markers : [],
        messages: [],
        conversationId: null
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
        },
        changeUserId(state, val){
            state.userId = val;
        },
        changeUsers(state, val){
            state.users = val;
        },
        addUsers(state, val){
            state.users = state.users.concat(val)
        },
        changeMarkers(state, val){
            state.markers = state.markers.concat(val);
        },
        resetMarkers(state){
            state.markers = []
        },
        changeActiveMessages(state, val) {
            // eslint-disable-next-line no-console
            console.log('changeActiveMessages', val)
            state.messages = val;
        }
    },
    getters: {
        users : state => state.users,
        user: state => state.user,
        country: state => state.country,
        activeChat: state => state.activeChat,
        activeChatId: state => state.activeChatId,
        userId: state => state.userId,
        messages: state => state.messages,
        markers: state => state.markers,
    }

})