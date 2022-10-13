const { Router } = require('express');
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');

const router = Router();

// Configuro los routers:
router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);

module.exports = router;
