<template>
  <div class="small">
    <b-container id="app" class="container">
      <b-row class="ml-3">
        <b-col class="ml-auto" md="5" v-if="average">
           <div style="font-weight: bold">
            Current:
            <b-badge
              variant="danger"
              v-if="average >temperature_thresshold.max_warning"
            >{{average}} °C</b-badge>
            <b-badge
              variant="warning"
              v-if="average >temperature_thresshold.max_normal && average <=temperature_thresshold.max_warning"
            >{{average}} °C</b-badge>
            <b-badge
              variant="primary"
              v-if="average >= temperature_thresshold.min_normal && average <=temperature_thresshold.max_normal"
            >{{average}} °C</b-badge>
            <b-badge
              variant="info"
              v-if="average < temperature_thresshold.min_normal"
            >{{average}} °C</b-badge>
          </div>
        </b-col>
        <b-col class="mx-auto" md="6" v-if="weather">
          <div style="font-weight: bold">
            Environment: {{weather ? weather.temp: null}} °C
          </div>
        </b-col>
        <b-col class="mx-auto" md="12" v-if="difference">
          <p style="font-weight: bold">
            Difference:
            <b-badge variant="light">{{difference}} °C</b-badge>
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <bar-chart :chart-data="datacollection"></bar-chart>
          <div id="setTemperature" @click="fillData()"></div>
          <!-- <b-button @click="fillData()" variant="primary" size="sm">Get T°</b-button> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
import axios from "axios";
import moment from "moment";

import { EventBus } from "../../event-bus.js";

// Listen for the clicked event and its payload.
EventBus.$on("getData", function() {
  document.getElementById("setTemperature").click();
});

export default {
  components: {
    BarChart
  },
  data() {
    return {
      loaded: false,
      datacollection: {
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "#69caf0"
          }
        ]
      },
      device: this.$store.state.device,
      token: this.$store.state.token,
      weather: this.$store.state.weather_conditions,
      average: 0,
      avg_color: "success",
      difference: 0,
      temperature_thresshold: {
        min_normal: 20,
        max_normal: 26,
        max_warning: 30
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    async fillData() {
      try {
        const headers = {
          Authorization: this.token
        };
        let response = await axios.get("http://localhost:3000/Devices?n=10", {
          headers
        });
        this.device = response.data.devices.find(x => x != "");
        this.plot(this.device);
      } catch (e) {
        console.error(e);
      }
    },

    async plot(device) {
      try {
        const headers = {
          Authorization: this.token
        };
        let response = await axios.get(
          `http://localhost:3000/${device}/temperature?last=50`,
          {
            headers
          }
        );

        this.temps = response.data
          .map(temperature => parseFloat(temperature.temperature))
          .reverse();
        this.temptimes = response.data
          .map(timestamp =>
            moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
          )
          .reverse();

        this.datacollection = {
          labels: this.temptimes,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: "#69caf0",
              data: this.temps
            }
          ]
        };

        this.average = (
          this.temps.reduce((x, y) => x + y, 0) / this.temps.length
        ).toFixed(2);
        this.difference = this.weather
          ? (this.average - this.weather.temp).toFixed(2)
          : 0;

        this.$store.state.current_data.temp = this.average;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
.small {
  max-width: 500px auto;
  margin: 10px auto;
  float: right;
}
</style>