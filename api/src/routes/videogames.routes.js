const { Router } = require('express');
const { getAllVideoGames, postVideogame } = require('../controllers');

const router = Router()

// RUTA GET -> /videogames y /videogames?name='' (query) ----------------------------- +
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        let info = await getAllVideoGames();

        if (name) {
            let gameName = info.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
            gameName.length
                ? res.status(200).send(gameName)
                : res.status(404).send({ msg: "Videogame Not Found" })
        }
        else {
            res.status(200).send(info);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'ERROR EN RUTA GET A /videogames' });
    }
});

// RUTA POST -> /videogames (crear videojuego) --------------------------------------
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await postVideogame(data);
        res.status(200).send({ msg: `The videogame: ${data.name}, has been created` })

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'ERROR EN RUTA POST A /videogames' });
    }
});

//-----------------------------------------------------------------------------------
module.exports = router;