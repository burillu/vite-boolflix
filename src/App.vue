<template>
  <div class="my-wrapper">
    <header>
      <AppHeader @search-input="queryModify" />
    </header>
    <main class="bg-secondary h-100">
      <div class=" container">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3" v-for="movie in store.movieList">
            <AppCard :name="movie.title" :src="store.apiUrlImg + movie.poster_path" :subtitle="movie.original_title"
              :data1="movie.original_language" :data2="movie.vote_average" />
            <!-- <div>titolo :{{ movie.title }}</div>
            <div>original title :{{ movie.original_title }}</div>
            <div>original lang :{{ movie.original_language }}</div>
            <div>Vote :{{ movie.vote_average }}/10</div> -->
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
    },

  },
  created() {

  },
  components: { AppHeader, AppCard },

}
</script>

<style lang="scss" scoped>
.my-wrapper {
  height: 100vh;
  overflow-y: hidden;
}

main {
  overflow-y: auto;
}
</style>