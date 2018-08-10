<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie" v-bind:key="movie">{{ movie.movie.Title }}</div>
  </div>
</template>
<script>
  import genres from '../util/genres'; 
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
    }
  }
</script>