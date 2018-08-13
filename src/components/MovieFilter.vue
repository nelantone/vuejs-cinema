<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>By Time of the day</h3>
    <div class="filter-group">
      <check-filter v-for="time in times" category="time" v-bind:title="time" v-bind:key="time"></check-filter>
    </div>
    <h3>By Genre</h3>
    <div class="filter-group">
      <check-filter v-for="genre in genres" category="genre" v-bind:title="genre" v-bind:key="genre"></check-filter>
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import CheckFilter from './CheckFilter.vue';
  
  export default {
    data() {
      return {
        genres,
        times
      }
    },
    components: {
      CheckFilter,
    }
  }
</script>