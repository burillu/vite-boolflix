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
          <div class="row gy-3 py-2" id="movies">
            <h2>Movies</h2>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="movie in store.movieList">
              <div class="row justify-content-center">
                <div class="col-7 col-md-10 col-lg-12">
                  <AppCard :name="movie.title" :src="setCoverSrc(movie.poster_path)" :subtitle="movie.original_title"
                    :srcFlag="setSrcFlag(movie.original_language)" :data1="movie.original_language"
                    :data2="movie.vote_average" :id="movie.id" :overview="movie.overview" :actors="movie.cast"
                    :genres="movie.genresFounds" @get-info="getCreditAndGen($event, movie)" />
                  <!--  /> -->
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
            <h2>Series TV</h2>
            <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="serie in store.seriesList">
              <div class="row justify-content-center">
                <div class="col-7 col-md-10 col-lg-12">
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
      // cast: []


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

      const url = `${this.store.apiUrl}movie/${ident}${this.store.endPoint.credits}`;
      axios.get(url, { params: { 'api_key': this.store.params.api_key } }).then(resp => {
        //console.log(resp.data.cast)
        if (resp.data.cast.length > 5) {
          const cast = [];
          for (let index = 0; index < 5; index++) {
            const actor = resp.data.cast[index];
            cast.push(actor)



          }
          movie.cast = cast;
          console.log(movie);
        } else {
          movie.cast = resp.data.cast
        }

        // this.store.cast = resp.data.cast;
        //this.cast = [];
      })
    },
    getAxiosCall(url, params) {
      return axios.get(url, { params });
    },
    getGenre() {
      const urlMovie = this.store.apiUrl + this.store.endPoint.genre.movie;
      const urlTv = this.store.apiUrl + this.store.endPoint.genre.tv;
      Promise.all([this.getAxiosCall(urlMovie, { 'api_key': store.params.api_key }), this.getAxiosCall(urlTv, { 'api_key': store.params.api_key })]).then(resp => {
        const genresMovie = resp[0].data.genres;
        this.store.genresList = genresMovie;
        const genresTv = resp[1].data.genres;
        //const genres = genresMovie.concat(genresTv)
        //console.log(genresMovie);
        //primo tentativo
        // for (let index = 0; index < genresTv.length; index++) {
        //   const element = genresTv[index];
        //   //console.log(element);
        //   if (!genresMovie.includes(element)) {
        //     genresMovie.push(element)
        //   }

        // }
        //secondo tentativo
        // genres.forEach((el, i) => {
        //   const genMovie = el[i];
        //   for (let index = 0; index < resp[1].length; index++) {
        //     const element = resp[1][index];
        //     if (!genMovie.name === element.name) {
        //       genres.push(element)
        //     }

        //   }
        // });
        //terzo tentativo
        //genres.reduce()
        //quarto tentativo JSON.stringify()
        for (let index = 0; index < genresTv.length; index++) {
          const element = genresTv[index];
          //console.log(element);
          if (!JSON.stringify(genresMovie).includes(element.name)) {
            store.genresList.push(element)
          }

        }


        //console.log(store.genresList);
      })

    }

  },
  created() {
    this.getGenre()

  },
  computed: {

  },
  updated() {
    //store.cast = []
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