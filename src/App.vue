<template>
  <div :class="{ 'my-wrapper': !store.query }">
    <header>
      <AppHeader @search-input="queryModify" />
    </header>
    <main class="bg-secondary h-100 py-4">
      <div class=" container">
        <!-- container movies -->
        <div class="row" id="movies">
          <h2>Movies</h2>
          <div class="col-12 col-md-4 col-lg-3" v-for="movie in store.movieList">
            <AppCard :name="movie.title" :src="store.apiUrlImg + movie.poster_path" :subtitle="movie.original_title"
              :data1="movie.original_language" :data2="movie.vote_average" />

            <!-- <div>titolo :{{ movie.title }}</div>
            <div>original title :{{ movie.original_title }}</div>
            <div>original lang :{{ movie.original_language }}</div>
            <div>Vote :{{ movie.vote_average }}/10</div> -->
          </div>
        </div>
        <div class="row" id="series">
          <h2>Series</h2>
          <div class="col-12 col-md-4 col-lg-3" v-for="serie in store.seriesList">
            <AppCard :name="serie.name" :subtitle="serie.original_name" :data1="serie.original_language"
              :data2="serie.vote_average" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from './data/store.js'
import AppHeader from './components/AppHeader.vue';
import AppCard from './components/AppCard.vue';

export default {
  name: "App",
  data() {
    return {
      store
    };
  },
  methods: {
    printMovies() {
      const url = this.store.apiUrl + this.store.endPoint.movie;
      axios.get(url, { params: this.store.params }).then(resp => {
        //console.log(resp.data.results)
        this.store.movieList = resp.data.results
      })
    },
    queryModify(input) {
      this.store.params.query = input;
      //console.log(input);
      this.printMovies();
      this.printSeries();
    },
    printSeries() {
      const url = this.store.apiUrl + this.store.endPoint.tv;
      axios.get(url, { params: this.store.params }).then(resp => {
        //console.log(resp.data.results);
        this.store.seriesList = resp.data.results
      })
    }

  },
  created() {

  },
  components: { AppHeader, AppCard, AppCard },

}
</script>

<style lang="scss" scoped>
.my-wrapper {
  height: 100vh;

}

main {
  overflow-y: auto;
}
</style>

<!-- Milestone 1 COmpleted -->