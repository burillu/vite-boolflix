<template>
  <div class="my-wrapper">
    <header>
      <AppHeader />
    </header>
    <main class="bg-secondary h-100">

    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from './data/store.js'
import AppHeader from './components/AppHeader.vue';
export default {
  name: "App",
  data() {
    return {
      store
    };
  },
  methods: {},
  created() {
    // const url = this.store.apiUrl + this.store.endPoint.movie;
    // axios.get(url, { params: this.store.params }).then(resp => {
    //   console.log(resp)
    // })
  },
  components: { AppHeader }
}
</script>

<style lang="scss" scoped>
.my-wrapper {
  height: 100vh;
}
</style>