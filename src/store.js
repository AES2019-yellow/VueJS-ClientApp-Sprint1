import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJpYXQiOjE1NzQ1MjI2ODksImV4cCI6MTU3NDU0NDI4OX0.gKedQiHONGrppjQEf988Jrce7IomSQsdsS-DHzTecic",

    },
    mutations: {
        updateToken(state, newtoken){
            state.token = newtoken
        }
    },
    actions:{
        
    }
})