<template>
  <div class="small">
    <b-container id="app" class="container">
      <b-row class="ml-3">
        <b-col class="ml-auto" md="5" v-if="average">
          <div style="font-weight: bold">
            Current:
            <b-badge variant="light">{{average}} hPa</b-badge>
          </div>
        </b-col>
        <b-col class="mx-auto" md="6" v-show="weather">
          <div style="font-weight: bold">Environment: {{weather ? weather.pressure: null}} hPa</div>
        </b-col>
        <b-col class="ml-auto" md="12" v-if="difference">
          <p style="font-weight: bold">
            Difference:
            <b-badge variant="light">{{difference}} hPa</b-badge>
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <bar-chart :chart-data="datacollection"></bar-chart>
          <div id="setPressure" @click="fillData()"></div>
          <!-- <b-button id="getData" @click="fillData()" variant="primary" size="sm">Get Pres</b-button> -->
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
  document.getElementById("setPressure").click();
});

export default {
  name: "pressure",
  components: {
    BarChart
  },
  data() {
    return {
      loaded: false,
      datacollection: {
        datasets: [
          {
            label: "Pressure",
            backgroundColor: "#33cc33"
          }
        ]
      },
      token: this.$store.state.token,
      device: this.$store.state.device,
      weather: this.$store.state.weather_conditions,
      average: 0,
      difference: 0
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
        let response = await axios.get("http://localhost:3000/Devices?n=50", {
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
          `http://localhost:3000/${device}/pressure?last=50`,
          {
            headers
          }
        );

        this.press = response.data
          .map(pressure => parseFloat(pressure.pressure))
          .reverse();
        this.presstimes = response.data
          .map(timestamp =>
            moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
          )
          .reverse();

        this.datacollection = {
          labels: this.presstimes,
          datasets: [
            {
              label: "Pressure",
              backgroundColor: "#33cc33",
              data: this.press
            }
          ]
        };

        this.average = (
          this.press.reduce((x, y) => x + y, 0) / this.press.length
        ).toFixed(2);
        this.difference = this.weather
          ? (this.average - this.weather.pressure).toFixed(2)
          : 0;
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