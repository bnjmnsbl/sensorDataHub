<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="section">
    <SensorItem :results="results"></SensorItem>
    </div>
  </div>
</template>

<script>
import SensorItem from './components/SensorItem.vue'
import {APIService} from './ApiService.js';

const apiService = new APIService();

export default {
  name: 'app',
  components: {
  
    SensorItem
  },
  data() {
    return {
      results: []};
  },
  methods: {
    getSensors() {
      apiService.getAllSensors().then((result)=>{
        this.results = result;
      });
    }
  },
  mounted() {
    this.getSensors();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
