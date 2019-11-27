import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJ1c2VybmFtZSI6InRlc3QiLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0sImlhdCI6MTU3NDg0ODM3NH0.MlxgFp-EB2TYg7qnPx0LJjIdg9m8nOztMk2yHz_VO28",

    },
    mutations: {
        updateToken(state, newtoken){
            state.token = newtoken
        }
    },
    actions:{
        
    }
})