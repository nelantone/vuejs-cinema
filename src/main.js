import Vue from 'vue';
import './style.scss';
import MovieList from './components/MovieLits.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
  },
  methods: {
    checkFilter(category, title, checked) {
      if (checked) {
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          // index starts in 0 if is 0 exists, that's why we look for -1
          this[category].splice(index, 1);
        }
      }
    }
  },
  components: {
    MovieList,
    MovieFilter
  }
});
