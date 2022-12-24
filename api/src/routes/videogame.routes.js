const { Router } = require('express');
const { getAllVideoGames } = require('../controllers');
const { Videogame } = require("../db");

const router = Router();

// RUTA GET -> /videogame/:id -------------------------------------------------------
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let info = await getAllVideoGames();

        if (id) {
            let gameId = info.find(g => g.id == id)
            gameId
                ? res.status(200).send(gameId)
                : res.status(404).send({ msg: "Videogame Not Found" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'ERROR EN RUTA GET A /videogame/:id' });
    }
});

// RUTA DELETE -> /videogame/:id ----------------------------------------------------
router.delete('/:id', async (req, res) => { // faltaria hacerle el boton eliminar en el front
    try {
        const { id } = req.params;

        await Videogame.destroy({
            where: { id: id }
        });
        res.send({ msg: "Erased" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'ERROR EN RUTA DELETE A /videogame/:id' })

    }
});

//-----------------------------------------------------------------------------------
module.exports = router;