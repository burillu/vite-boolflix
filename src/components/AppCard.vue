<template>
    <div :id="id">
        <img :src="src" :alt="name" class="rounded-2">
        <div class="">
            <div>titolo :{{ name }}</div>
            <div>original title :{{ subtitle }}</div>
            <div>original lang :{{ data1 }}</div>
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
img {
    width: 100%
}
</style>