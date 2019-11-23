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
      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJkb3JhZG8xMTIiLCJlbWFpbCI6ImRvcmFkb0Bjb3JyZW8uY29tIiwiaWF0IjoxNTc0NDUxMTM5LCJleHAiOjE1NzQ0NzI3Mzl9.LFvfxOcEdJAYxpLtUCa6o12YVf7OXKOGeyz058LnUnA",
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
        console.log(response.data.devices);
      } catch (e) {
        console.error(e);
      }
    },
    plot(device) {
      const headers = {
        Authorization: this.token
      };
      axios
        .get(`http://localhost:3000/${device}/airquality?last=30`, {headers})
        .then(response => {
          this.co2s = response.data.map(CO2 => CO2.CO2);
          this.co2times = response.data.map(timestamp =>
            moment(timestamp.timestamp).format("MMMM dd YY, h:mm:ss a")
          );
        });
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