import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_NAME, GET_VIDEOGAME_DETAILS, POST_VIDEOGAME, GET_ALL_GENRES, FILTER_GENRES, ORDER_NAME, ORDER_RATING, CLEAN_DETAILS } from './actions.js';

const initialState = {
    allVideogames: [],
    videogameDetails: {},
    videogamesFilter: [],
    allGenres: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogamesFilter: payload,
                allVideogames: payload,
            };
        case GET_ALL_GENRES:
            return {
                ...state,
                allGenres: payload,
            };
        case GET_VIDEOGAME_NAME:
            return {
                ...state,
                allVideogames: payload,
            };
        case GET_VIDEOGAME_DETAILS:
            return {
                ...state,
                videogameDetails: payload,
            };
        case POST_VIDEOGAME:
            return {
                ...state,
            };
        case FILTER_GENRES:
            const copyAll = state.videogamesFilter;
            const filterGenres = payload === "all"
                ? copyAll
                : copyAll.filter((v) => v.genres.includes(payload));
            return {
                ...state,
                allVideogames: filterGenres
            };
        case ORDER_NAME:
            let sortName = state.allVideogames.sort((a, b) => {
                if (a.name < b.name) return payload === "asc" ? -1 : 1;
                if (a.name > b.name) return payload === "asc" ? 1 : -1;
                return 0;
            });
            return {
                ...state,
                allVideogames: sortName
            };
        case ORDER_RATING: // no anda DESC
            const sorteArrRating =
                payload === "desc"
                    ? state.videogamesFilter.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return 1;
                        }
                        if (b.rating > a.rating) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.videogamesFilter.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return -1;
                        }
                        if (b.rating > a.rating) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                allVideogames: sorteArrRating,
            };
        case CLEAN_DETAILS:
            return {
                ...state,
                videogameDetails: payload
            };
        default: {
            return state
        };
    }
};

export default rootReducer;