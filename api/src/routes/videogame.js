const { Router } = require('express');
const { getVideogameId } = require('../controllers');
const { Videogame, Genre } = require("../db");

const router = Router();

// RUTA GET -> /videogame/:id -------------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            let game = await Videogame.findByPk(id, {
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            })
            res.status(200).json(game);
        }
        else {
            let info = await getVideogameId(id);
            res.status(200).send(info)
        }

    } catch (error) {
        res.status(400).send({ msg: 'ERROR EN RUTA GET A /videogame/:id' }, error);
    }
});

// RUTA DELETE -> /videogame/:id ----------------------------------------------------
router.delete('/:id', async (req, res) => { // faltaria hacerle el boton eliminar en el front
    try {
        const { id } = req.params;

        await Videogame.destroy({
            where: { id: id}
        });
        res.send('erased');
        
    } catch (error) {
        res.status(400).send({ msg: 'ERROR EN RUTA DELETE A /videogame/:id'}, error)
        
    }
});

//-----------------------------------------------------------------------------------
module.exports = router;