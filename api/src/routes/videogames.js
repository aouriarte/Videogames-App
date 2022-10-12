const { Router } = require('express');
const { getAllVideoGames, postVideogame } = require('../controllers');

const router = Router()

// RUTA GET -> /videogames y /videogames?name='' (query) -----------------------------
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        let info = await getAllVideoGames();

        if (name) { // Primeros 15 juegos
            let gameName = info.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
            gameName.length
                ? res.status(200).send(gameName)
                : res.status(404).send('Videogame Not Found')
        }
        else {
            res.status(200).send(info);
        }
    } catch (error) {
        res.status(400).send({ msg: 'ERROR EN RUTA GET A /videogames' }, error);
    }
});


// RUTA GET -> /videogame/:id -------------------------------------------------------
router.get('/:id', async (req, res) => { // README.md -> videogame/:id
    try {
        const { id } = req.params;
        let info = await getAllVideoGames();

        if (id) {
            let videogame = info.filter(g => g.id == id)
            videogame.length
                ? res.status(200).send(videogame)
                : res.status(404).send('No videogame details found')
        }
    } catch (error) {
        res.status(400).send({ msg: 'ERROR EN RUTA GET A /videogame/:id' }, error);
    }
});


// RUTA POST -> /videogames (crear videojuego) --------------------------------------
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        let post = await postVideogame(data);
        res.status(200).send(post)
        
    } catch (error) {
        res.status(400).send({ msg: 'ERROR EN RUTA POST A /videogames' }, error);
    }
});


//-----------------------------------------------------------------------------------
module.exports = router;