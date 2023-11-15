<template>
    <div :id="id">
        <img :src="src" :alt="name" class="rounded-2 my-img-card">
        <div class="">
            <div>titolo :{{ name }}</div>
            <div>original title :{{ subtitle }}</div>
            <div>original lang : <img class="my-flag" :src="'./images/flags/4x3/' + data1 + '.svg'" :alt="data1">
            </div>
            <div>Vote :{{ data2 }}/10</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppCard',
    props: {
        src: String,
        name: String,
        subtitle: String,
        data1: String,
        data2: Number,
        id: Number,
    }
}
</script>

<style lang="scss" scoped>
.my-img-card {
    width: 100%
}

.my-flag {
    width: 20px;
}
</style>