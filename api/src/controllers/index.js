const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { APIKEY } = process.env;

// getApiInfo ------------------------------------------------------------------------------------------
const getApiInfo = async () => {
    let oneHundredGames = [];
    let urlApi = `https://api.rawg.io/api/games?key=${APIKEY}`

    try {
        for (let i = 0; i < 5; i++) {
            let info = await axios.get(urlApi)
            info.data.results.map(g => {
                oneHundredGames.push({
                    id: g.id,
                    name: g.name,
                    image: g.background_image,
                    released: g.released,
                    rating: g.rating,
                    platforms: g.platforms.map(p => p.platform.name),
                    genres: g.genres.map(g => g.name),
                });
            });
            urlApi = info.data.next;
        }
        return oneHundredGames;

    } catch (error) {
        console.log('ERROR EN controller: getApiInfo', error);
    }
};

// getDBInfo -------------------------------------------------------------------------------------------
const getDBInfo = async () => {
    try {
        return await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });

    } catch (error) {
        console.log('ERROR EN controller: getApiInfo', error);
    }
};

// getAllVideoGames -----------------------------------------------------------------------------------
const getAllVideoGames = async () => {
    try {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDBInfo();
        return [...apiInfo, ...dbInfo];

    } catch (error) {
        console.log('ERROR EN controller: getApiInfo', error);
    }
};

// getVideogameId -------------------------------------------------------------------------------------
const getVideogameId = async (id) => {
    try {
        let info = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)

        info = info.data
        let videogame = {
            id: info.id,
            name: info.name,
            image: info.background_image,
            description: info.description_raw,
            released: info.released,
            rating: info.rating,
            platforms: info.platforms.map(p => p.platform.name),
            genres: info.genres.map(g => g.name)
        }
        return videogame;

    } catch (error) {
        console.log('ERROR EN controller: getVideogameId', error);
    }
};

// getAllGenres ----------------------------------------------------------------------------------------
const getAllGenres = async () => {
    try {
        let info = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)

        let dataGenres = info.data.results.map(g => g.name);
        dataGenres.forEach(genre => {
            Genre.findOrCreate({
                where: { name: genre }
            });
        });

        let allGenres = await Genre.findAll();
        return allGenres;

    } catch (error) {
        console.log('ERROR EN controller: getApiInfo', error);
    }
};

// postVideogame --------------------------------------------------------------------------------------- +
const postVideogame = async (data) => {
    try {
        const { name, image, description, released, rating, platforms, genres } = data;

        let videogame = {
            name,
            image,
            description,
            released,
            rating,
            platforms,
        }

        let newVideogame = await Videogame.create(videogame)
        genres.map(async g => {
            let genre = await Genre.findAll({
                where: { name: g }
            });
            newVideogame.addGenre(genre)
        });

    } catch (error) {
        console.log('ERROR EN postVideogame', error)
    }
};

//------------------------------------------------------------------------------------------------------
module.exports = { getApiInfo, getDBInfo, getAllVideoGames, getVideogameId, getAllGenres, postVideogame };