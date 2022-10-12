const { Router } = require('express');
const videogames = require('./videogames.js');
const genres = require('./genres.js');

const router = Router();

// Configuro los routers:
router.use('/videogames', videogames);
router.use('/genres', genres);

module.exports = router;
