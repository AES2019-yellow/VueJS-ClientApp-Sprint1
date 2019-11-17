<template>
  <div class="medium">
    <div v-if="errorStr">
      Sorry, but the following error
      occurred: {{errorStr}}
    </div>
    <div v-if="location && place">
      Your current location is: {{place}}
    </div>
    <div v-if="airQuality">
      <h5>Air Quality</h5>
      <ul>
        <li v-for="item in airQuality" v-bind:key="item.name">
          <div>{{ item.name }}, valuePPB: {{ item.valuePPB }}, valueUGM3: {{ item.valueUGM3}}, AQI: {{ item.aqi}} , Status: {{ item.category}}</div>
        </li>
      </ul>
    </div>
    <h6>Source: http://api.aerisapi.com</h6>    
    <div v-if="weatherParams">
      <h5>Conditions Parameters</h5>
      <ul>
        <li>
          Temperature: {{weatherParams.temp}}
        </li>
        <li>
          Pressure: {{weatherParams.pressure}}
        </li>
        <li>
          Humidity: {{weatherParams.humidity}}
        </li>
      </ul>
    </div>
    <h6>Source: http://api.openweathermap.org</h6>
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";

export default {
  data() {
    return {
      location: null,
      errorStr: null,
      airQuality: null,
      weatherParams: null,
      place: null
    };
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.location = pos;
        this.getAirQuality(pos);
        this.getWeather(pos);
      },
      err => {
        this.errorStr = err.message;
      }
    );
  },
  methods: {
    getAirQuality(location) {
      try {
        axios
          .get(
            `http://api.aerisapi.com/airquality/${location.coords.latitude},${location.coords.longitude}?client_id=lb0lr2m16uYd0oENeFeZy&client_secret=iSgRXRaZBQJGtlveYR1mVuD6pTkePdnqK19VUf25`
          )
          .then(response => 
            this.airQuality = response.data.response[0].periods[0].pollutants.map(item =>
              item
            ).filter(x => x.type != "pm10" && x.type != "pm2.5")
          );
      } catch (e) {
        console.error(e);
      }
    },
    getWeather(location) {
      try {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=8f343836a14787d4573a0daabf48adc0`
          )
          .then(response =>{
              this.weatherParams = response.data.main;
              this.place = response.data.name
            }
          );
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
.small {
  max-width: 1000px auto;
  margin: 50px auto;
  float: right;
}
</style>