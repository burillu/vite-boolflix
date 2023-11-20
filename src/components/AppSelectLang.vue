<template>
    <div>
        <select @change="selectLang" class="form-select ms-auto" aria-label="Default select example" v-model="selectedLang">
            <option value="" selected>&#127470;&#127481;</option>
            <option value="it-IT"> &#127470;&#127481;</option>
            <option value="en-US"> &#127468;&#127463;</option>


        </select>
    </div>
</template>

<script>
import { store } from '../data/store'
export default {
    name: 'AppSelectLang',
    data() {
        return {
            //data
            selectedLang: '',
            store
        }
    },
    methods: {
        selectLang() {
            this.store.params.language = this.selectedLang;
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 20px;
}

select {
    width: 100px;
}
</style>