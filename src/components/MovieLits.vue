<template>
  <div id="movie-list">
    <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"></movie-item>
  </div>
</template>
<script>
  import genres from '../util/genres'; 
  import MovieItem from './MovieItem.vue';

  export default {
    props: ['genres', 'time', 'movies' ],
    methods: {
      moviePassesGenreFilter(item) {
          let movieGenres = item.movie.Genre.split(', ')
          return this.genres.find(genre => movieGenres.includes(genre));
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