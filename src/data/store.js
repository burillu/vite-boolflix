import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    apiUrlImg: 'https://image.tmdb.org/t/p/w342/',
    srcFlagDefault: './images/flags/default-lang.png',
    srcCoverDefault: './images/default-cover.jpg',
    endPoint: {
        movie: 'search/movie',
        tv: 'search/tv',
        credits: '/credits',
        genre: { movie: 'genre/movie/list', tv: 'genre/tv/list' }
    },
    params: {
        api_key: 'b285e37a3d80a17dd8298c11e01cac11',
        query: '',
        language: 'it-IT'
    },
    movieList: [],
    seriesList: [],
    genresList: [],
    cast: [],
    selected: '',


});

//api per conoscere il cast 
//https://api.themoviedb.org/3/movie/{movie_id}/credits