<template>
  <div :class="{ 'my-wrapper': !store.params.query }">
    <header>
      <AppHeader @search-input="queryModify" />
    </header>
    <main class="bg-secondary h-100 py-4">
      <div class="container">
        <div v-if="!store.params.query">
          fai una Ricerca
        </div>
        <div v-else>
          <!-- container movies -->
          <div class="row gy-3 flex-wrap py-2" id="movies">
            <h2>Movies</h2>
            <div class="col-12 col-md-4 col-lg-3" v-for="movie in store.movieList">
              <div class="row justify-content-center">
                <div class="col-8 col-md-12">
                  <AppCard :name="movie.title" :src="setCoverSrc(movie.poster_path)" :subtitle="movie.original_title"
                    :srcFlag="setSrcFlag(movie.original_language)" :data1="movie.original_language"
                    :data2="movie.vote_average" :id="movie.id" :overview="movie.overview" />
                </div>
              </div>



              <!-- <div>titolo :{{ movie.title }}</div>
            <div>original title :{{ movie.original_title }}</div>
            <div>original lang :{{ movie.original_language }}</div>
            <div>Vote :{{ movie.vote_average }}/10</div> -->
            </div>
          </div>
          <!-- container series -->
          <div class="row gy-3 py-2" id="series">
            <h2>Series</h2>
            <div class="col-6 col-md-4 col-lg-3" v-for="serie in store.seriesList">
              <div class="row justify-content-center">
                <div class="col-8 col-md-12">
                  <AppCard :name="serie.name" :subtitle="serie.original_name" :data1="serie.original_language"
                    :data2="serie.vote_average" :src="setCoverSrc(serie.poster_path)"
                    :srcFlag="setSrcFlag(serie.original_language)" :overview="serie.overview" />
                </div>
              </div>
            </div>
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
      store,
      srcString: `./images/flags/`,
      errorLang: ['ca', 'de', 'en', 'fr', 'it', 'jp', 'kr', 'us'],


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
    },
    setSrcFlag(lang) {
      if (!this.errorLang.includes(lang)) {
        return store.srcFlagDefault
      } else {
        const src = this.srcString + lang + '.svg';
        return src;
      }

    },
    setCoverSrc(data) {
      console.log(data);
      if (data) {
        const src = this.store.apiUrlImg + data
        return src
      } else {
        return this.store.srcCoverDefault
      }

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

div.container {
  overflow-y: hidden;
}
</style>

<!-- Milestone 4 COmpleted -->