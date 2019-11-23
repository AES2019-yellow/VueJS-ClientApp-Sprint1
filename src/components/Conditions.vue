<template>
  <b-container>
    <b-alert
      v-model="error"
      variant="danger"
      dismissible
    >Sorry, but the following error occurred: {{errorStr}}</b-alert>
    <b-row v-if="location && place">
      <b-col class="text-center">
        <h5> Your current location is: {{place}}</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="airQuality">
        <h5>Air Quality</h5>
        <b-table striped hover :items="airQuality"></b-table>
        <b-link href="http://api.aerisapi.com">http://api.aerisapi.com</b-link>
      </b-col>
      <b-col v-if="weatherParams">
        <h5>Conditions Parameters</h5>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Temperature
            <b-badge variant="primary">{{weatherParams.temp}} °C</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Pressure
            <b-badge variant="success">{{weatherParams.pressure}} hPa</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Humidity
            <b-badge variant="warning">{{weatherParams.humidity}}</b-badge>
          </b-list-group-item>
        </b-list-group>
        <b-link href="http://api.openweathermap.org">http://api.openweathermap.org</b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      location: null,
      errorStr: null,
      error: false,
      airQuality: null,
      weatherParams: null,
      place: null
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {

    getLocation() {
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        this.error = "true";
        return;
      }

      // get position
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.location = pos;
          this.getAirQuality(pos);
          this.getWeather(pos);
        },
        err => {
          this.errorStr = err.message;
          this.error = true;
        }
      );
    },
    getAirQuality(location) {
      try {
        axios
          .get(
            `http://api.aerisapi.com/airquality/${location.coords.latitude},${location.coords.longitude}?client_id=lb0lr2m16uYd0oENeFeZy&client_secret=iSgRXRaZBQJGtlveYR1mVuD6pTkePdnqK19VUf25`
          )
          .then(
            response =>
              (this.airQuality = response.data.response[0].periods[0].pollutants
                .map(item => item)
                .filter(x => x.type != "pm10" && x.type != "pm2.5" && x.type)
                .map(y => {
                  const parameter = {};
                  parameter["Parameter"] = y.name;
                  parameter["PPB"] = y.valuePPB;
                  parameter["UGM3"] = y.valueUGM3;
                  parameter["AQI"] = y.aqi;
                  return parameter;
                }))
          );
      } catch (e) {
        console.error(e);
      }
    },
    getWeather(location) {
      try {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&APPID=8f343836a14787d4573a0daabf48adc0`
          )
          .then(response => {
            this.weatherParams = response.data.main;
            this.place = response.data.name;
          });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
</style>