<template>
  <div>
    <h1>Pippo <i class="fa-brands fa-sass fa-fade"></i></h1>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from './data/store.js'
export default {
  name: 'App',
  data() {
    return {
      store
    }
  },
  methods: {

  },
  created() {
    // const url = this.store.apiUrl + this.store.endPoint.movie;
    // axios.get(url, { params: this.store.params }).then(resp => {
    //   console.log(resp)
    // })
  }
}
</script>

<style lang="scss" scoped></style>