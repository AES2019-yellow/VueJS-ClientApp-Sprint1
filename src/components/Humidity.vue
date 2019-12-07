<template>
  <div class="small">
    <div>External Humidity: {{weather.humidity}} %</div>
    <label id="humLabel" style="display: none"></label>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <b-button @click="fillData()" variant="primary" size="sm">Get Hum</b-button>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
import axios from "axios";
import moment from "moment";

export default {
  name: "humidity",
  components: {
    BarChart
  },
  data() {
    return {
      loaded: false,
      datacollection: {
        datasets: [
          {
            label: "Humidity",
            backgroundColor: "#fcbe03"
          }
        ]
      },
      token: this.$store.state.token,
      device: this.$store.state.device,
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
          `http://localhost:3000/${device}/humidity?last=50`,
          {
            headers
          }
        );

        this.hum = response.data
          .map(humidity => parseFloat(humidity.humidity))
          .reverse();
        this.humtimes = response.data
          .map(timestamp =>
            moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
          )
          .reverse();

        this.datacollection = {
          labels: this.humtimes,
          datasets: [
            {
              label: "Humidity",
              backgroundColor: "#fcbe03",
              data: this.hum
            }
          ]
        };

        const average = this.hum.reduce((x,y) => x+y, 0)/this.hum.length
        document.getElementById("humLabel").style.display = "block";
        document.getElementById("humLabel").innerHTML =
          "Current Humidity: " + average.toFixed(2) +"%";
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