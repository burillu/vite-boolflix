<template>
  <div class="my-wrapper">
    <header>
      <AppHeader />
    </header>
    <main class="bg-secondary h-100">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3" v-for="movie in store.movieList">
            <AppCard :name="movie.title" />
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
  methods: {},
  created() {
    const url = this.store.apiUrl + this.store.endPoint.movie;
    axios.get(url, { params: this.store.params }).then(resp => {
      //console.log(resp.data.results)
      this.store.movieList = resp.data.results
    })
  },
  components: { AppHeader, AppCard }
}
</script>

<style lang="scss" scoped>
.my-wrapper {
  height: 100vh;
}
</style>