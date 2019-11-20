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
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      try {
        axios
          .get(
            "http://localhost:3000/fe%3A1f%3Aa1%3A94%3Ac8%3A20/pressure?last=30"
          )
          .then(response => {
            this.press = response.data.map(pressure =>
              parseFloat(pressure.pressure)
            );
            this.presstimes = response.data.map(timestamp =>
              moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
            );
            //  console.log(this.press)
          });

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
  max-width: 800px auto;
  margin: 10px auto;
  float: left;
}
</style>