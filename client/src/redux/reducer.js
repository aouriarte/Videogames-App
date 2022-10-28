import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_NAME, GET_VIDEOGAME_DETAILS, POST_VIDEOGAME, GET_ALL_GENRES, FILTER_GENRES, FILTER_CREATED, ORDER_NAME, ORDER_RATING, CLEAN_DETAILS } from './actions.js';

const initialState = {
    videogames: [],
    videogameDetails: {},
    allVideogames: [],
    allGenres: [],
    platforms: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_VIDEOGAMES:
            let platforms = [];
            payload.map((p) => (platforms = [...platforms, ...p.platforms]));
            return {
                ...state,
                videogames: payload,
                allVideogames: payload,
                platforms: Array.from(new Set(platforms)),
            };
        case GET_ALL_GENRES:
            return {
                ...state,
                allGenres: payload,
            };
        case GET_VIDEOGAME_NAME:
            return {
                ...state,
                videogames: payload,
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
            const copyAll = state.allVideogames;
            const filterGenres = payload === "all"
                ? copyAll
                : copyAll.filter((v) => v.genres.includes(payload));
            return {
                ...state,
                videogames: filterGenres,
            };
        case FILTER_CREATED:
            const all = state.videogames;
            const filterCreated = payload === "created"
                ? all.filter((v) => v.created)
                : all.filter((v) => !v.created);

            return {
                ...state,
                videogames:
                    payload === "all" ? state.videogames : filterCreated,
            };
        case ORDER_NAME:
            let sortName = state.videogames.sort((a, b) => {
                if (a.name < b.name) return payload === "asc" ? -1 : 1;
                if (a.name > b.name) return payload === "asc" ? 1 : -1;
                return 0;
            });
            return {
                ...state,
                videogames: sortName,
            };
        case ORDER_RATING:
            const sorteArrRating =
                payload === "desc"
                    ? state.videogames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return 1;
                        }
                        if (b.rating > a.rating) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.videogames.sort(function (a, b) {
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
                videogames: sorteArrRating,
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