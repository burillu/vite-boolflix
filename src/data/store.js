import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    endPoint: {
        movie: 'search/movie',
        series: 'search/series'
    },
    params: {
        api_key: xxxxxxx,
        query: 'a'
    }

});