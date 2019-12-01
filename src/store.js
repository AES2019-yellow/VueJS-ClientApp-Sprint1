import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNTc1MjE4MTcxLCJleHAiOjE1NzUyMzk3NzF9.ahkp4-meaVY2PmBot_snG9T8y0Col_bDqgkYeTqHI6o"

    },
    mutations: {
        updateToken(state, newtoken){
            state.token = `Bearer ${newtoken}`
        }
    },
    actions:{
        
    }
})