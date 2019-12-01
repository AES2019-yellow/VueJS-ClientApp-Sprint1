import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "es6-promise/auto";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:3000";

export default new Vuex.Store({
  state: {
    token: 'Bearer '+localStorage.getItem("access_token") || null,
    device: null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    retrieveDevice(state, device) {
      state.device = device;
    }
  },
  actions: {
    async retrieveToken(context, credentials) {
      try {
        let response = await axios.post("/login", {
          user: {
            email: credentials.email,
            password: credentials.password
          }
        });
        const token = response.data.token;

        localStorage.setItem("access_token", token);
        context.commit("retrieveToken", token);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    destroyToken(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
  
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/logout")
            .then(response => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              resolve(response);
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              reject(error);
            });
        });
      }
    },
    async retrieveDevice(context){
      axios.defaults.headers.common['Authorization'] = context.state.token
        try {
          let response = await axios.get("/Devices");
          const device = response.data.devices.find(x => x != "");
  
          context.commit("retrieveDevice", device);
          return response;
        } catch (e) {
          console.error(e);
          return e;
        }
    },
    retrieveData(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
  
      axios.get('/todos')
        .then(response => {
          context.commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  
  }
});
