import axios from 'axios';
import swal from "sweetalert";

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_NAME = 'GET_VIDEOGAMEGAME_NAME';
export const GET_VIDEOGAME_DETAILS = 'GET_VIDEOGAME_DETAILS';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';

export const CHANGE_PAGE = 'CHANGE_PAGE';

export const FILTER_GENRES = "FILTER_GENRES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_RATING = "ORDER_RATING";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const CLEAN_VIDEOGAMES = "CLEAN_VIDEOGAMES";

// ALL VIDEOGAMES: Traigo juegos -> BACK -----------------------------------------------
export const getAllVideogames = () => {
    return async (dispatch) => {
        try {
            let allGames = await axios.get('/videogames'); //'http://localhost:3001/videogames'
            dispatch({ type: GET_ALL_VIDEOGAMES, payload: allGames?.data });

        } catch (error) {
            console.log('ERROR EN getAllVideogames/actions', error);
        }
    };
};

// NAME: Traigo al juego por su nombre -------------------------------------------------
export const getVideogameName = (name) => {
    return async (dispatch) => {
        try {
            let game = await axios.get(`/videogames?name=${name}`);
            dispatch({ type: GET_VIDEOGAME_NAME, payload: game.data });

        } catch (error) {
            swal("Not Found", "That videogame does not exist", "error");
            console.log('ERROR EN getVideogameName/actions', error);
        }
    };
};

// DETAILS: Traigo a el videogame y sus datos desde el ID -------------------------------
export const getVideogameDetail = (id) => {
    return async (dispatch) => {
        try {
            let details = await axios.get(`/videogame/${id}`);
            dispatch({ type: GET_VIDEOGAME_DETAILS, payload: details.data });

        } catch (error) {
            console.log('ERROR EN getVideogameDetail/actions', error);
        }
    };
};

// POST: Crear un videogame a través de los datos que me pasen en el post (payload) -----
export const postVideogame = (payload) => {
    try {
        return async () => {
            let newVideogame = await axios.post('/videogames', payload);
            return newVideogame;
        };
    } catch (error) {
        console.log('ERROR EN postVideogame/actions', error)
    }
};

// ALL GENRES: Traigo los géneros -> BACK -----------------------------------------------
export const getAllGenres = () => {
    return async (dispatch) => {
        try {
            let genres = await axios.get('/genres');
            dispatch({ type: GET_ALL_GENRES, payload: genres?.data });

        } catch (error) {
            console.log('ERROR EN getAllGenres/actions', error)
        }
    };
};

// PAGINADO: Cambiar de página --------------------------------------------------------
export const changePage = (payload) => {
    return {
        type: CHANGE_PAGE,
        payload
    };
};

// Filtrados y Ordenamientos ------------------------------------------------------------
// Filtrar por GENRES:
export const filterGenres = (payload) => {
    return {
        type: FILTER_GENRES,
        payload
    }
};

// Filtrar por CREADOS:
export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    }
};

// Ordenar por NAME:
export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload
    }
};

// Ordenar por RATING: 
export const orderRating = (payload) => {
    return {
        type: ORDER_RATING,
        payload
    }
};

// Limpiar Detalles:
export const cleanDetails = (payload) => {
    return {
        type: CLEAN_DETAILS,
        payload
    }
};

// Limpiar Filtros y Ordenamientos:
export const cleanVideogames = () => {
    return {
        type: CLEAN_VIDEOGAMES,
    };
};