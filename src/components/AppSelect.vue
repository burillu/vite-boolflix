<template>
    <select @change="selectToFiltre" class="form-select mx-3" aria-label="Default select example" v-model="store.selected">
        <option value="">Scegli un genere</option>
        <option v-for="item in store.genresList" :value="item.id">{{ item.name }}</option>

    </select>
</template>

<script>
import { store } from '../data/store.js'
export default {
    name: 'AppSelect',
    data() {
        return {

            store
        }
    },
    props: {

    },
    methods: {
        selectToFiltre() {
            if (!this.store.movieList) {
                return
            }


        }
    }

}
</script>

<style lang="scss" scoped></style>