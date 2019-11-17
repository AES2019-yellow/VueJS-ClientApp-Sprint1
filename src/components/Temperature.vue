<template>
  <div class="small">
    <label id="tempLabel" style="display: none"></label>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <button @click="fillData()">Get temperature data</button>
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
            "http://localhost:3000/fe%3A1f%3Aa1%3A94%3Ac8%3A20/temperature?last=50"
          )
          .then(response => {
            this.temps = response.data.map(temperature =>
              parseFloat(temperature.temperature)
            );
            this.temptimes = response.data.map(timestamp =>
              moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
            );
            //  console.log(this.temps)
          });

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
          "Current Temperature: " + this.temps[this.temps.length - 1];
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
.small {
  max-width: 1000px auto;
  margin: 50px auto;
  float: right;
}
</style>