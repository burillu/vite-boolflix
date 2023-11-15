import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    apiUrlImg: 'https://image.tmdb.org/t/p/w500/',
    endPoint: {
        movie: 'search/movie',
        series: 'search/series'
    },
    params: {
        api_key: 'b285e37a3d80a17dd8298c11e01cac11',
        query: 'a',
        language: 'it-IT'
    },
    movieList: [],
    sereisList: [],


});