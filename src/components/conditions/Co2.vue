<template>
  <div class="small">
    <b-container id="app" class="container">
      <b-row class="ml-4">
        <b-col class="ml-auto" md="5" v-if="average">
          <div style="font-weight: bold">
            Current:
            <b-badge variant="danger" v-if="average >= co2_thresshold.max_danger">{{average}} ppm</b-badge>
            <b-badge
              variant="warning"
              v-if="average > co2_thresshold.max_warning && average < co2_thresshold.max_danger"
            >{{average}} ppm</b-badge>
            <b-badge
              variant="primary"
              v-if="average >= co2_thresshold.max_normal && average < co2_thresshold.max_warning"
            >{{average}} ppm</b-badge>
            <b-badge
              variant="info"
              v-if="average >= co2_thresshold.min_normal && average < co2_thresshold.max_normal"
            >{{average}} ppm</b-badge>
            <b-badge variant="success" v-if="average < co2_thresshold.min_normal">{{average}} ppm</b-badge>
          </div>
        </b-col>
        <b-col class="mx-auto" md="6" v-show="air_quality">
          <div
            style="font-weight: bold"
          >Environment: {{air_quality ? air_quality.filter(x => x.Parameter == "carbon monoxide")[0].UGM3 : null}} ppm</div>
        </b-col>
        <b-col class="mx-auto" md="6" v-if="difference">
          <p style="font-weight: bold">
            Difference:
            <b-badge variant="light">{{difference}} ppm</b-badge>
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <bar-chart onload="fillData()" :chart-data="datacollection"></bar-chart>
          <div id="setAir" @click="fillData()"></div>
          <!-- <b-button @click="fillData()" variant="primary" size="sm">Get CO2</b-button> -->
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
  document.getElementById("setAir").click();
});

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
      device: this.$store.state.device,
      token: this.$store.state.token,
      air_quality: this.$store.state.air_quality,
      average: 0,
      avg_color: "success",
      difference: 0,
      co2_thresshold: {
        min_normal: 350,
        max_normal: 1000,
        max_warning: 2000,
        max_danger: 5000
      }
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
          `http://localhost:3000/${device}/airquality?last=50`,
          {
            headers
          }
        );

        this.co2s = response.data.map(CO2 => parseFloat(CO2.CO2)).reverse();
        this.co2times = response.data
          .map(timestamp =>
            moment(timestamp.timestamp).format("MMMM Do YYYY, h:mm:ss a")
          )
          .reverse();
        this.datacollection = {
          labels: this.co2times,
          datasets: [
            {
              type: "bar",
              label: "CO2",
              backgroundColor: "#f87979",
              data: this.co2s
            }
          ]
        };

        this.average = (
          this.co2s.reduce((x, y) => x + y, 0) / this.co2s.length
        ).toFixed(2);
        this.difference = this.air_quality
          ? (
              this.average -
              this.air_quality.filter(x => x.Parameter == "carbon monoxide")[0]
                .UGM3
            ).toFixed(2)
          : 0;

        this.$store.state.current_data.co2 = this.average;
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