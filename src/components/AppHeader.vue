<template>
    <nav class="navbar navbar-expand-lg bg-black">
        <div class="container-fluid">
            <a class="navbar-brand text-danger text-uppercase fw-bold" href="#">Boolfix</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li>

                    </li>
                </ul>

                <form class="d-flex" role="search" @submit.prevent>
                    <AppSelect />
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        v-model="inputStr" @keyup.enter="$emit('searchInput', inputStr)">
                    <button class="btn btn-outline-danger" type="button"
                        @click="$emit('searchInput', inputStr)">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
import AppSelect from './AppSelect.vue';

export default {
    name: "AppHeader",
    data() {
        return {
            inputStr: ""
        };
    },
    components: { AppSelect }
}
</script>

<style lang="scss" scoped></style>
