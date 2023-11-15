<template>
    <div :id="id">
        <!-- <img :src="src" :alt="name"> -->
        <div class="bg-warning">
            <span>{{ name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppCard',
    props: {
        src: String,
        name: String,
        id: Number,
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 100%
}
</style>