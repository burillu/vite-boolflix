<template>
  <div>
    <h1>Pippo</h1>
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

  }
}
</script>

<style lang="scss" scoped></style>