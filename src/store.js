import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "es6-promise/auto";

Vue.use(Vuex);
let BASE_URL = "http://localhost:3000"
axios.defaults.baseURL = BASE_URL;

export default new Vuex.Store({
  state: {
    token: "Bearer " + localStorage.getItem("access_token") || null,
    device: null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null && state.token != "Bearer null";
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = "Bearer " + token;
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
      localStorage.removeItem("access_token");
      context.commit("destroyToken");
    },
    async register(context, data) {
      try {
        let register = await axios.post("/register", {
          user: {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
          }
        });
        let response = await axios.get(register.data.activation.split(BASE_URL)[1])
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async retrieveDevice(context) {
      axios.defaults.headers.common["Authorization"] = context.state.token;
      try {
        let response = await axios.get("/Devices");
        const device = response.data.devices.find(x => x != "");

        context.commit("retrieveDevice", device);
        return response;
      } catch (e) {
        console.error(e);
        return e;
      }
    }
  }
});
