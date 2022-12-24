const { Router } = require('express');
const videogames = require('./videogames.routes.js');
const videogame = require('./videogame.routes.js');
const genres = require('./genres.routes.js');

const router = Router();

// Configuro los routers:
router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);

module.exports = router;
