<template>
  <div id="app">
    <h1>Automatic Suffocation Detection System - Sprint1</h1>
   <temperature/> 
   <co2/>
   </div>
</template>

<script>
import Temperature from './components/Temperature.vue'
import Co2 from './components/Co2'

export default {
  name: 'app',
  components: {
    Temperature,
    Co2
      },
  data() {
     return {
       temperatures: [],
       times: []
     }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-self: center;
  margin-top: 30px;
  max-width: auto;
}
</style>
