<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies"
                  v-bind:movie="movie.movie"
                  v-bind:key="movie.id"
      >
      <div class="movie-sessions">
        <div v-for="session in filteredSessions(movie.sessions)"
             class="session-time-wrapper tooltip-wrapper"
             v-tooltip="{ seats: session.seats }"
             v-bind:key="session.id">
          <div class="session-time">{{ formatSessionTime(session.time) }}</div>
        </div>
      </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results" >
        {{ noResults }}
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import MovieItem from './MovieItem.vue';

  export default {
    props: ['genres', 'time', 'movies', 'day' ],
    methods: {
      formatSessionTime (raw) {
        return this.$moment(raw).format('h:mm A')
      },
      filteredSessions(sessions) {
        return sessions.filter(this.sessionPassesTimeFilter);
      },
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
      },
      sessionPassesTimeFilter(session) {
        if (!this.day.isSame(this.$moment(session.time), 'day')) {

        } else if (this.time.lenght == 0 || this.time.lenght == 2 ) {
          return false;
        } else if (this.time[0] === times.AFTER_6PM) {
          return this.$moment(session.time).hour() >= 18;
        } else {
          return this.$moment(session.time).hour() < 18;
        }
      }
    },
    computed: {
      filteredMovies() {
        return this.movies
                .filter(this.moviePassesGenreFilter)
                .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
        ;
      },
      noResults() {
        let times = this.time.join(', ');
        let genres = this.genres.join(', ');
        return `No results for ${times} ${ genres.lenght && times.lenght ? ', ' : ' ' } ${genres}.`;
      }
    },
    components: {
      MovieItem
    }
  }
</script>