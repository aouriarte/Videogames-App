const { Router } = require('express');
const { getAllGenres } = require('../controllers');

const router = Router();

// RUTA GET -> /genres -----------------------------------------------------
router.get('/', async (req, res) => {
    try {
        let info = await getAllGenres();
        res.status(200).send(info);
        
    } catch (error) {
        res.status(400).send({ msg: 'ERROR EN RUTA GET A /genres' }, error);
    }
});

//-------------------------------------------------------------------------
module.exports = router;