<template>
  <b-container id="app" class="container">
    <b-alert v-model="warning" variant="warning" dismissible>{{error_message}}</b-alert>
    <b-alert v-model="danger" variant="danger" dismissible>{{error_message}}</b-alert>
    <b-row class="text-center">
      <b-col class="mx-auto" md="5">
        <p style="font-weight: bold">Current location: {{place}}</p>
      </b-col>
    </b-row>
    <hr />
    <b-row class="text-center">
      <b-col class="mx-auto" md="5">
        <b-button @click="emitGlobalClickEvent()" variant="primary" size="md">Get data</b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col class="mr-auto" md="5">
        <temperature />
      </b-col>
      <b-col class="mx-auto" md="5">
        <co2 />
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col class="mr-auto" md="5">
        <pressure />
      </b-col>
      <b-col class="mx-auto" md="5">
        <humidity />
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <conditions />
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>


<script>
import Temperature from "./Temperature.vue";
import Co2 from "./Co2";
import Pressure from "./Pressure";
import Humidity from "./Humidity";
import Conditions from "./Conditions";

import { EventBus } from "../../event-bus.js";

export default {
  name: "app",
  components: {
    Temperature,
    Co2,
    Pressure,
    Humidity,
    Conditions
  },
  data() {
    return {
      place: this.$store.state.place,
      weather: this.$store.state.weather_conditions,
      warning: false,
      danger: false,
      error_message: "",
      current_data: this.$store.state.current_data
    };
  },
  mounted() {
    this.emitGlobalClickEvent();
  },
  methods: {
    emitGlobalClickEvent() {
      // Send the event on a channel (i-got-clicked) with a payload (the click count.)
      EventBus.$emit("getData");
      if (this.weather) {
        if (this.current_data.temp > 27 && this.current_data.hum > 45) {
          this.warning = true;
          this.error_message = "Warning! Low Alert of Suffocation";
        }
        if (this.current_data.temp > 33 && this.current_data.hum > 45) {
          this.warning = true;
          this.danger = false;
          this.error_message = "Warning! Medium Alert of Suffocation";
        }
        if (this.current_data.temp > 40 && this.current_data.hum > 45) {
          this.danger = true;
          this.warning = false;
          this.error_message = "Danger! High Alert of Suffocation";
        }
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 30px;
  max-width: auto;
}
</style>