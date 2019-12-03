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
      token : "Bearer " + localStorage.token,
     // token: this.$store.state.token,
      device: this.$store.state.device
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    async fillData() {
      try {
        // let response = await this.$store.dispatch("retrieveDevice");
        // this.device = response.data.devices.find(x => x != "");
        // this.plot(this.device);
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
          `http://localhost:3000/${device}/pressure?last=30`,
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