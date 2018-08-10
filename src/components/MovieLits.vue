<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies"
                  v-bind:movie="movie.movie"
                  v-bind:sessions="movie.sessions"
                  v-bind:key="movie.id"
                  v-bind:day="day">
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results" >
        No results.
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres'; 
  import MovieItem from './MovieItem.vue';

  export default {
    props: ['genres', 'time', 'movies', 'day' ],
    methods: {
      moviePassesGenreFilter(item) {
          if (!this.genres.length) {
            return true;
          } else {
            let movieGenres = item.movie.Genre.split(", ");
            let matched = true;
            this.genres.forEach( genre => {
              if (movieGenres.indexOf(genre) === -1) {
                matched = false;
              }
            });
            return matched;
          }
          // let movieGenres = item.movie.Genre.split(', ')
          // return this.genres.find(genre => movieGenres.includes(genre));
        // /Example: long version of #find
        // find((genre)=>{
        //   return movie.genre === genre
        // })
      }
    },
    computed: {
      filteredMovies() {
        return this.movies.filter(this.moviePassesGenreFilter);
      }
    },
    components: {
      MovieItem
    }
  }
</script>