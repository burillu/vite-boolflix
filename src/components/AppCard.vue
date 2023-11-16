<template>
    <div class="card-wrapper">
        <div :id="id" v-if="!hoverCover" @mouseover="hoverCover = true" @mouseleave="hoverCover = false" class="h-100">
            <img :src="src" :alt="name" class="rounded-2 my-img-card">
            <!-- <div class="">
                <div>titolo :{{ name }}</div>
                <div>original title :{{ subtitle }}</div>
                <div>original lang : <img class="my-flag" :src="srcFlag" :alt="data1">

                </div>
                <div><i v-for="n in 5" class="fa-star" :class="(n < avgStar ? 'fa-solid text-warning' : 'fa-regular')" />
                    <br>{{
                        data2
                    }}/10
                </div>
            </div> -->
        </div>
        <div v-else class="bg-black text-white p-2" id="overview" @mouseleave="hoverCover = false">
            <div class="mb-3">
                <div><span class="fw-bold">titolo:</span> {{ name }}</div>
                <div><span class="fw-bold">original title:</span>{{ subtitle }}</div>
                <div><span class="fw-bold">original lang:</span> <img class="my-flag" :src="srcFlag" :alt="data1">

                </div>
                <div> <span class="fw-bold">voto:</span><i v-for="n in 5" class="fa-star"
                        :class="(n < avgStar ? 'fa-solid text-warning' : 'fa-regular')" /> <br>{{
                            data2
                        }}/10</div>
            </div>
            <div class="">
                <p>{{ overview }}</p>
            </div>

        </div>
    </div>
</template >

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
        overview: String
    },
    data() {
        return {
            avgStar: Math.ceil(this.data2 / 2),
            hoverCover: false
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

<style lang = "scss" scoped >
.my-img-card {
    width: 100%;
    height: 100%;
    object-position: bottom;
}

.my-flag {
    width: 20px;
}

.card-wrapper {
    height: 380px;
}

#overview {
    overflow-y: auto;
    height: 100%;
}
</style>
