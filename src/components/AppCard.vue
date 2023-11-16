<template>
    <div :id="id">
        <img :src="src" :alt="name" class="rounded-2 my-img-card">
        <div class="">
            <div>titolo :{{ name }}</div>
            <div>original title :{{ subtitle }}</div>
            <div>original lang : <img class="my-flag" :src="srcFlag" :alt="data1">

            </div>
            <div><i v-for="n in 5" class="fa-star" :class="(n < avgStar ? 'fa-solid text-warning' : 'fa-regular')" /> <br>{{
                data2
            }}/10</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppCard',
    props: {
        src: String,
        srcFlag: String,
        name: String,
        subtitle: String,
        data1: String,
        data2: Number,
        id: Number,
    },
    data() {
        return {
            avgStar: Math.ceil(this.data2 / 2)
        }

    },
    methods: {
        setDefaultImg() {
            console.log('immagine non trovata');
            //this.error = null;
            //this.srcString = './images/default-lang.png'
        }
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