<template>
  <div class="small">
    <label id="CO2Label" style="display: none"></label>
    <bar-chart onload="fillData()" :chart-data="datacollection"></bar-chart>
    <b-button @click="fillData()" variant="primary" size="sm">Get CO2</b-button>
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
      datacollection: {
        datasets: [
          {
            label: "CO2",
            backgroundColor: "#f87979"
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
          `http://localhost:3000/${device}/airquality?last=30`,
          {
            headers
          }
        );

        this.co2s = response.data.map(CO2 => CO2.CO2).reverse();
        this.co2times = response.data.map(timestamp =>
          moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
        ).reverse();
        this.datacollection = {
          labels: this.co2times,
          datasets: [
            {
              label: "CO2",
              backgroundColor: "#f87979",
              data: this.co2s
            }
          ]
        };
        document.getElementById("CO2Label").style.display = "block";
        document.getElementById("CO2Label").innerHTML =
          "Current CO2: " + this.co2s[this.co2s.length - 1];
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
  float: center;
}
</style>