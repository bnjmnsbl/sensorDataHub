<template>
  <div class="item">
    <article v-for="result in results" v-bind:key="result.metadata.app_id" class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img src="./../assets/logo.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <a href="#" class="has-text-info">
                        <strong>{{result.metadata.app_id}}</strong> 
                    </a> 
                    <small>, Berlin (Germany)</small> 
                    <br>
                    Measuring Sensor Data from Trees around Kreuzberg
                    </br>
                    <small class="is-size-7">
                        Submitted by:
                        <img class="image is-24x24" src="./../assets/logo.png"> {{result.metadata.owner}} 
                    </small> 
                </p>
            </div>
        </div>
        <div class="media-right">
            <span class="icon is-small">
                <i class="fa fa-heart"></i>
                <strong class="has-text-info">20</strong>
            </span> 
        </div>
    </article>
    
 
    <p>{{results}}</p>
    
  </div>
</template>

<script>
import {APIService} from '../ApiService';

const apiService = new APIService();

export default {
  name: 'SensorItem',
  props: {
    results: Array
  },
  components: {

  },
  data(){
    return{
      showError: false
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.media {
    min-width: 80%;
    margin: 0 auto;
    border: 1px solid #e6e7e9;
    padding: 1em 1.5em 0.5em 1.5em;
    border-radius: 0.3em;
}

.media + .media {
  margin-top: 1.5rem;
}


.media-content {
    width: 400px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
