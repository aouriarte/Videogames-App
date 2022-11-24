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
                    id: g[0].id,
                    name: g[0].name,
                    image: g[0].background_image,
                    released: g[0].released,
                    rating: g[0].rating,
                    platforms: g[0].platforms.map(p => p.platform.name),
                    genres: g[0].genres.map(g => g.name),
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
        const infoDb = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
        const newGame = await infoDb.map((n) => {
            return {
                id: n.id,
                name: n.name,
                image: n.image,
                released: n.released,
                rating: n.rating,
                platforms: n.platforms,
                genres: n.genres.map(g => g.name),
                created: n.created,
            };
        });
        return newGame;

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
            id: info[0].id,
            name: info[0].name,
            image: info[0].background_image,
            description: info[0].description_raw,
            released: info[0].released,
            rating: info[0].rating,
            platforms: info[0].platforms.map(p => p.platform.name),
            genres: info[0].genres.map(g => { return { id: g.id, name: g.name } })
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

        let newVideogame = await Videogame.create(
            {
                name,
                image,
                description,
                released,
                rating,
                platforms,
            }
        );
        let genreDB = await Genre.findAll({
            where: { name: genres }
        });
        await newVideogame.addGenre(genreDB);

    } catch (error) {
        console.log('ERROR EN postVideogame', error)
    }
};

//------------------------------------------------------------------------------------------------------
module.exports = { getApiInfo, getDBInfo, getAllVideoGames, getVideogameId, getAllGenres, postVideogame };