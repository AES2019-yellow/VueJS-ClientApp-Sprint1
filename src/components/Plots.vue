<template>
    <b-container id="app" class="container">
    <b-row class="text-center">
      <b-col class="mr-auto" md="5">
        <temperature />
      </b-col>
      <b-col class="mx-auto" md="5">
        <co2 />
      </b-col>
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

export default {
  name: "app",
  components: {
    Temperature,
    Co2,
    Pressure,
    Humidity,
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