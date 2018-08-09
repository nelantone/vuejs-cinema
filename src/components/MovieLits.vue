<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
  </div>
</template>
<script>
  import genres from '../util/genres'; 
  export default {
    data() {
      return {
        movies: [
          { title: "pulp fiction", genre: genres.CRIME },
          { title: "home alone", genre: genres.COMEDY },
          { title: "Austin Powers", genre: genres.COMEDY }
        ]
      }
    },
    props: ['genres', 'time' ],
    methods: {
      moviePassesGenreFilter(movie) {
          return this.genres.find(genre => movie.genre === genre);
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