<template>
    <div class="card-wrapper">
        <!-- <div :id="id" v-if="!hoverCover" @mouseover="hoverCover = true" @mouseleave="hoverCover = false" class="h-100"> -->
        <div class="box">
            <div class="box-inner">
                <!-- cover -->
                <div class="box-front">
                    <div :id="id" class="h-100">

                        <img :src="src" :alt="name" class="rounded-2 my-img-card">


                    </div>
                </div>
                <!-- overview -->
                <div class="box-back">
                    <div class="bg-black text-white p-2 rounded-2" id="overview">
                        <!-- <div v-else class="bg-black text-white p-2" id="overview" @mouseleave="hoverCover = false"> -->
                        <div class="mb-3">
                            <div><span class="fw-bold">Titolo:</span> {{ name }}</div>
                            <div><span class="fw-bold">Original Title:</span>{{ subtitle }}</div>
                            <div><span class="fw-bold">Original Lang:</span> <img class="my-flag" :src="srcFlag"
                                    :alt="data1">

                            </div>
                            <div>

                                <span class="fw-bold">Voto:</span><i v-for="n in 5" class="fa-star"
                                    :class="(n < avgStar ? 'fa-solid text-warning' : 'fa-regular')"></i> <br>
                                <div>{{ data2 }}/10</div>
                                <!-- aggiungere una i di informazioni per stampare in aggiunta i nomi degli attori e il genere -->
                                <i @click="$emit('getInfo', id)" class="fa-solid fa-circle-info"></i>
                                <div v-if="actors" class="">
                                    <div class="text-decoration-underline">cast:</div>
                                    <span v-for=" actor in actors"> {{ actor.name }} , </span>

                                    <div class="">
                                        <div class="text-decoration-underline">genres:</div>
                                        <span>" <span v-for=" gen in genres"> {{ gen.name }}, </span>,,, "</span>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>


                        </div>
                        <div class="">
                            <p><span class="text-decoration-underline">Trama:</span><br>{{ overview }}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
</template >

<script>
import { store } from '../data/store.js'
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
        overview: String,
        actors: Array,
        genres: Array
    },
    data() {
        return {
            avgStar: Math.ceil(this.data2 / 2),
            hoverCover: false,
            store
        }

    },
    methods: {
        getGenresName() {
            //tentativo 1
            // const found = this.store.genresList.find((element) => {
            //     element.id 
            // });
            //tentativo2 con find
            // const genreFound= this.store.genresList.find(element => {


            //     return element.id===
            //     for (let index = 0; index < this.store.genreIds.length; index++) {
            //         const element = this.store.genresList[index];
            //         i
            //     }

            // })
            //tentativo con for in
            const genresFounds = [];
            for (const element of this.store.genresList) {
                if (this.genreIds.includes(element.id)) {
                    genresFounds.push(element);
                }
            }
            return genresFounds

        }
    },
    created() {
        // actor5() {
        //     return this.actors.slice(0, 5);
        // }
        //console.log(this.getGenresName())
        // this.getGenresName();
    }
}
</script>

<style lang = "scss" scoped >
.my-img-card {
    width: 100%;
    height: 100%;
    //object-position: bottom;
}

.my-flag {
    width: 20px;
}

.card-wrapper {
    height: 380px;
    width: 100%;
}

i.fa-circle-info {
    cursor: pointer
}

i.fa-circle-info:hover {
    text-shadow: 0 0 2px white;
    transform: scale(1.2);
}

#overview {
    overflow-y: auto;
    height: 100%;
}

// animation flip

.box {
    background-color: transparent;
    width: 100%;
    height: 100%;
    //border: 1px solid #eeeeee;
    perspective: 1000px;
}

.box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.box:hover .box-inner {
    transform: rotateY(180deg);
}

.box-front,
.box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.box-front {
    //background-color: #cccccc;
    color: #111111;
}

.box-back {
    //background-color: #8ebf42;
    color: #eeeeee;
    transform: rotateY(180deg);
}
</style>
