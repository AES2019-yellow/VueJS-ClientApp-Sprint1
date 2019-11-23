<template>
  <div class="small">
    <label id="pressLabel" style="display: none"></label>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <b-button @click="fillData()" variant="primary" size="sm">Get Pres</b-button>
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
            label: "Pressure",
            backgroundColor: "#33cc33"
          }
        ]
      },
      token: this.$store.state.token
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    async fillData() {
      const headers = {
        Authorization: this.token
      };
      try {
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
          `http://localhost:3000/${device}/pressure?last=30`,
          {
            headers
          }
        );

        this.press = response.data.map(pressure =>
          parseFloat(pressure.pressure)
        );
        this.presstimes = response.data.map(timestamp =>
          moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
        );

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
        document.getElementById("pressLabel").style.display = "block";
        document.getElementById("pressLabel").innerHTML =
          "Current Pressure: " + this.press[this.press.length - 1];
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