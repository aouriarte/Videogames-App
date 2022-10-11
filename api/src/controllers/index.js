const axios = require('axios');
const { Videogame, Genres } = require('../db.js');
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
                model: Genres,
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


// getAllGenres ----------------------------------------------------------------------------------------
const getAllGenres = async () => {
    try {

    } catch (error) {
        console.log('ERROR EN controller: getApiInfo', error);
    }
};

//------------------------------------------------------------------------------------------------------
module.exports = { getApiInfo, getDBInfo, getAllVideoGames, getAllGenres };