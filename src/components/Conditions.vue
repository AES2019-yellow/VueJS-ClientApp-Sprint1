<template>
  <b-container>
    <b-alert
      v-model="error"
      variant="danger"
      dismissible
    >Sorry, but the following error occurred: {{errorStr}}</b-alert>
    <b-row v-if="location && place">
      <b-col class="text-center">
        <h5>Your current location is: {{place}}</h5>
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
            <b-badge variant="warning">{{weatherParams.humidity}} %</b-badge>
          </b-list-group-item>
        </b-list-group>
        <b-link href="http://api.openweathermap.org">http://api.openweathermap.org</b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

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
    async getAirQuality(location) {
      try {
        this.airQuality = await this.$store.dispatch("retrieveAirConditions", location);
      } catch (e) {
        console.error(e);
      }
    },
    async getWeather(location) {
      try {
        let response = await this.$store.dispatch("retrieveWeatherConditions", location);
        this.weatherParams = response.main;
        this.place = response.name;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
</style>