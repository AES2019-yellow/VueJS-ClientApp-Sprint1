<template>
  <div class="small">
    <div>External Temperature: {{weather.temp}} °C</div>
    <label id="tempLabel" style="display: none"></label>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <b-button @click="fillData()" variant="primary" size="sm">Get T°</b-button>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
import axios from "axios";
import moment from "moment";

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
      weather: this.$store.state.weather_conditions
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

        const average = this.temps.reduce((x,y) => x+y, 0)/this.temps.length

        document.getElementById("tempLabel").style.display = "block";
        document.getElementById("tempLabel").innerHTML =
          "Current Temperature: " + average.toFixed(2) + " °C";
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