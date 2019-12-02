<template>
  <div class="small">
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
      device: null,
      token: this.$store.state.token
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
        this.device = response.data.devices[0];
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
          `http://localhost:3000/${device}/temperature?last=30`,
          {
            headers
          }
        );

        this.temps = response.data.map(temperature =>
          parseFloat(temperature.temperature)
        );
        this.temptimes = response.data.map(timestamp =>
          moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
        );

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

        document.getElementById("tempLabel").style.display = "block";
        document.getElementById("tempLabel").innerHTML =
          "Current Temperature: " + this.temps[this.temps.length - 1] + "°C";
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