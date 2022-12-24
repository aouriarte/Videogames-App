const { Router } = require('express');
const { getAllGenres } = require('../controllers');

const router = Router();

// RUTA GET -> /genres -----------------------------------------------------
router.get('/', async (req, res) => {
    try {
        let allGenres = await getAllGenres();
        res.status(200).json(allGenres);

    } catch (error) {
        console.log('ERROR EN RUTA GET A /genres');
        res.status(500).send({ msg: error.message });
    }
});

//-------------------------------------------------------------------------
module.exports = router;