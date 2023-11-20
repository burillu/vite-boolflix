<template>
  <div class="my-wrapper">
    <header>
      <AppHeader @search-input="queryModify" />
    </header>
    <main class="bg-secondary h-100 py-4">
      <div class="container">
        <div v-if="onLoading" class="">
          <AppSpinnerLoad />
        </div>
        <div v-if="!store.params.query">
          fai una Ricerca
        </div>

        <div v-else-if="store.errorMsg">
          <div class="alert alert-danger" role="alert">
            {{ store.errorMsg }}
          </div>
        </div>
        <div v-else>



          <h2>Movies</h2>
          <div v-if="filterMovies < 1">
            Nessun risultato
          </div>
          <!-- container movies -->
          <div v-else>

            <div class="row gy-3 py-2" id="movies">
              <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="movie in filterMovies">
                <div class="row justify-content-center">
                  <div class="col-7 col-md-10 col-lg-12">
                    <AppCard :name="movie.title" :src="setCoverSrc(movie.poster_path)" :subtitle="movie.original_title"
                      :srcFlag="setSrcFlag(movie.original_language)" :data1="movie.original_language"
                      :data2="movie.vote_average" :id="movie.id" :overview="movie.overview" :actors="movie.cast"
                      :genres="movie.genresFounds" @get-info="getCreditAndGen($event, movie)" />
                    <!--  /> -->
                  </div>
                </div>




              </div>
            </div>

          </div>



          <h2>Series TV</h2>
          <div v-if="filterSeries < 1">
            Nessun risultato
          </div>
          <!-- container series -->
          <div v-else>
            <div class="row gy-3 py-2" id="series">
              <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="serie in filterSeries">
                <div class="row justify-content-center">
                  <div class="col-7 col-md-10 col-lg-12">
                    <AppCard :name="serie.name" :subtitle="serie.original_name" :data1="serie.original_language"
                      :data2="serie.vote_average" :id="serie.id" :src="setCoverSrc(serie.poster_path)"
                      :srcFlag="setSrcFlag(serie.original_language)" :actors="serie.cast" :genres="serie.genresFounds"
                      :overview="serie.overview" @get-info="getCreditAndGen($event, serie)" />
                  </div>
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
import AppSpinnerLoad from './components/AppSpinnerLoad.vue'

export default {
  name: "App",
  data() {
    return {
      store,
      srcString: `./images/flags/`,
      errorLang: ['ca', 'de', 'en', 'fr', 'it', 'jp', 'kr', 'us'],
      onLoading: false,
      //noResult: false


    };
  },
  methods: {
    printMoviesAndTv() {
      this.store.errorMsg = '';
      this.onLoading = true;
      const urlMovies = this.store.apiUrl + this.store.endPoint.movie;
      const urlTv = this.store.apiUrl + this.store.endPoint.tv;
      //chiamata axios
      Promise.all([this.getAxiosCall(urlMovies, this.store.params), this.getAxiosCall(urlTv, this.store.params)]).then(resp => {
        const movies = resp[0].data.results;
        const series = resp[1].data.results;


        this.store.movieList = movies;
        this.store.seriesList = series;

      }).catch(err => {
        //error catched
        this.store.errorMsg = err.message
      }).finally(() => {
        //stard spinner loader
        this.onLoading = false;
      })

    },
    queryModify(input) {
      this.store.params.query = input;
      //console.log(input);
      this.printMoviesAndTv();
    },
    // printSeries() {
    //   const url = this.store.apiUrl + this.store.endPoint.tv;
    //   axios.get(url, { params: this.store.params }).then(resp => {
    //     //console.log(resp.data.results);
    //     this.store.seriesList = resp.data.results
    //   })
    // },
    setSrcFlag(lang) {
      if (!this.errorLang.includes(lang)) {
        return store.srcFlagDefault
      } else {
        const src = this.srcString + lang + '.svg';
        return src;
      }

    },
    setCoverSrc(data) {
      //console.log(data);
      if (data) {
        const src = this.store.apiUrlImg + data
        return src
      } else {
        return this.store.srcCoverDefault
      }

    },
    getCreditAndGen(ident, movie) {
      this.getCast(ident, movie);
      this.getGenresName(movie.genre_ids, movie);
    },
    getGenresName(ids, movie) {
      //tentativo con for in

      const genresFounds = [];
      for (const element of this.store.genresList) {
        if (ids.includes(element.id)) {
          genresFounds.push(element);
        }
      }
      movie.genresFounds = genresFounds

    },
    getCast(ident, movie) {

      if (movie.cast) {
        return
      }

      this.onLoading = true;
      let url;
      if (movie.title) {
        url = `${this.store.apiUrl}movie/${ident}${this.store.endPoint.credits}`;
      } else if (movie.name) {
        url = `${this.store.apiUrl}tv/${ident}${this.store.endPoint.credits}`;
      }


      axios.get(url, { params: { 'api_key': this.store.params.api_key } }).then(resp => {
        //console.log(resp.data.cast)
        if (resp.data.cast.length > 5) {
          const cast = [];
          for (let index = 0; index < 5; index++) {
            const actor = resp.data.cast[index];
            cast.push(actor)



          }
          movie.cast = cast;
          //console.log(movie);
        } else {
          movie.cast = resp.data.cast
        }

        // this.store.cast = resp.data.cast;
        //this.cast = [];
      }).finally(() => {
        //stop spinner loader
        this.onLoading = false;
      })
    },
    getAxiosCall(url, params) {
      return axios.get(url, { params });
    },
    getGenre() {
      this.onLoading = true;
      const urlMovie = this.store.apiUrl + this.store.endPoint.genre.movie;
      const urlTv = this.store.apiUrl + this.store.endPoint.genre.tv;
      Promise.all([this.getAxiosCall(urlMovie, { 'api_key': store.params.api_key }), this.getAxiosCall(urlTv, { 'api_key': store.params.api_key })]).then(resp => {
        const genresMovie = resp[0].data.genres;
        this.store.genresList = genresMovie;
        const genresTv = resp[1].data.genres;

        for (let index = 0; index < genresTv.length; index++) {
          const element = genresTv[index];
          //console.log(element);
          if (!JSON.stringify(genresMovie).includes(element.name)) {
            store.genresList.push(element)
          }

        }


        //console.log(store.genresList);
      }).finally(() => {
        //stop spinner loader
        this.onLoading = false;
      })

    }

  },
  created() {

    this.getGenre()
    //console.log(Boolean(this.filterMovies))

  },
  computed: {
    filterMovies() {
      if (this.store.selected && this.store.movieList) {
        const filtered = this.store.movieList.filter(el => {
          //console.log(el.genre_ids);
          //console.log(this.store.selected);
          return el.genre_ids.includes(this.store.selected);

        })

        return filtered;
      } else {
        return this.store.movieList;
      }
    },
    filterSeries() {
      //this.noResult = false;
      if (this.store.selected && this.store.seriesList) {
        const filtered = this.store.seriesList.filter(el => {
          //console.log(el.genre_ids);
          //console.log(this.store.selected);
          return el.genre_ids.includes(this.store.selected);

        });
        // if (!filtered) {
        //   this.noResult = true;
        //   console.log(filtered);
        //   console.log(this.noResult);
        // }
        return filtered;
      } else {
        return this.store.seriesList;
      }
    }
  },
  updated() {
    //store.cast = []

  },
  components: { AppHeader, AppCard, AppCard, AppSpinnerLoad },

}
</script>

<style lang="scss" scoped>
.my-wrapper {
  height: calc(100vh - 56px);
  //overflow-y: hidden;


}

main {
  overflow-y: auto;
}

div.container {
  overflow-y: hidden;
}

header {
  height: 56px;
}
</style>

<!-- Milestone 6 COmpleted -->