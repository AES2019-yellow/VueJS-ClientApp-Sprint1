<template>
  <div id="app">
    <h2>Automatic Suffocation Detection System - Sprint2</h2>
    <temperature />
    <co2 />
    <location />
  </div>
</template>

<script>
import Temperature from "./components/Temperature.vue";
import Co2 from "./components/Co2";
import Location from "./components/Location";

export default {
  name: "app",
  components: {
    Temperature,
    Co2,
    Location
  },
  data() {
    return {
      temperatures: [],
      times: []
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-self: center;
  margin-top: 30px;
  max-width: auto;
}
</style>
