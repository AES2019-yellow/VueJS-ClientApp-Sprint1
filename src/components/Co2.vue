<template>
  <div class="small">
    <label id="CO2Label" style="display: none"></label>
    <bar-chart onload="fillData()" :chart-data="datacollection"></bar-chart>
    <button @click="fillData()">Get CO2 data</button>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
     methods: {
      fillData () {
      axios.get('http://localhost:3000/airquality?last=50')
      .then(response => {
          this.co2s = response.data.map(CO2 => CO2.CO2)
          this.co2times = response.data.map(timestamp => moment(timestamp.timestamp).format('MMMM Do YYYY, h:mm:ss a'))
      })
         this.datacollection = {
          labels: this.co2times,
          datasets: [
            {
              label: 'CO2',
              backgroundColor: '#f87979',
              data: this.co2s
            }]
      }
      document.getElementById("CO2Label").style.display = 'block';
      document.getElementById("CO2Label").innerHTML = "Current CO2: " + this.co2s[this.co2s.length -1];
    }
    }
  }
</script>

<style>
  .small {
      max-width: 1000px auto;
    margin:  50px auto;
    float: left;
  }
</style>