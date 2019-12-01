<template>
  <b-container id="app" class="container">
    <b-row >
      <b-col class="text-center">
        <h2>Automatic Suffocation Detection System - Sprint2</h2>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col class="mr-auto" md="3">
        <temperature />
      </b-col>
      <b-col class="mx-auto" md="3">
        <co2 />
      </b-col>
      <b-col class="ml-auto" md="3">
        <pressure />
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <conditions />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Temperature from "./components/Temperature.vue";
import Co2 from "./components/Co2";
import Pressure from "./components/Pressure";
import Conditions from "./components/Conditions";

export default {
  name: "app",
  components: {
    Temperature,
    Co2,
    Pressure,
    Conditions
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
