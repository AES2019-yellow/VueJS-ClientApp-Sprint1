import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "es6-promise/auto";

Vue.use(Vuex);
let BASE_URL = "http://localhost:3000";
axios.defaults.baseURL = BASE_URL;

export default new Vuex.Store({
  state: {
    token: "Bearer " + localStorage.getItem("access_token") || null,
    weather_conditions: null,
    air_quality: null,
    place: null,
    device: null, 
    username: localStorage.getItem("username") || null,
  },
  getters: {
    loggedIn(state) {
      return state.token != null && state.token != "Bearer null";
    },
    userName(state) {
      return state.username;
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
    },
    retrieveAirConditions(state, airQuality) {
      state.air_quality = airQuality;
    },
    retrieveWeatherConditions(state, weather_conditions) {
      state.weather_conditions = weather_conditions;
    },
    retrievePlace(state, place) {
      state.place = place;
    },
    retrieveUsername(state, username) {
      state.username = username;
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
        const username = response.data.user.username;

        localStorage.setItem("access_token", token);
        context.commit("retrieveToken", token);
        localStorage.setItem("username", username);
        context.commit("retrieveUsername", username);
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
        let response = await axios.get(
          register.data.activation.split(BASE_URL)[1]
        );
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
    },
    async retrieveAirConditions(context, location) {
      const AERIS_API_SECRET = "iSgRXRaZBQJGtlveYR1mVuD6pTkePdnqK19VUf25";
      const AERIS_API_KEY = "lb0lr2m16uYd0oENeFeZy";
      try {
        let response = await axios.get(
          `http://api.aerisapi.com/airquality/${location.coords.latitude},${location.coords.longitude}?client_id=${AERIS_API_KEY}&client_secret=${AERIS_API_SECRET}`
        );
        let airQuality = response.data.response[0].periods[0].pollutants
          .map(item => item)
          .filter(x => x.type != "pm10" && x.type != "pm2.5" && x.type)
          .map(y => {
            const parameter = {};
            parameter["Parameter"] = y.name;
            parameter["PPB"] = y.valuePPB;
            parameter["UGM3"] = y.valueUGM3;
            parameter["AQI"] = y.aqi;
            return parameter;
          });

        context.commit("retrieveAirConditions", airQuality);
        return airQuality;
      } catch (e) {
        console.error(e);
        return e;
      }
    },
    async retrieveWeatherConditions(context, location) {
      const OPENWEATHER_API_KEY = "8f343836a14787d4573a0daabf48adc0";
      try {
        let response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&APPID=${OPENWEATHER_API_KEY}`
        );

        context.commit("retrieveWeatherConditions", response.data.main);
        context.commit("retrievePlace", response.data.name);
        return response.data;
      } catch (e) {
        console.error(e);
        return e;
      }
    }
  }
});
