const { Router } = require('express');
const { getAllGenres } = require('../controllers');

const router = Router();

// RUTA GET -> /genres -----------------------------------------------------
router.get('/', async (req, res) => {
    try {
        let info = await getAllGenres();
        res.status(200).send(info);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'ERROR EN RUTA GET A /genres' });
    }
});

//-------------------------------------------------------------------------
module.exports = router;