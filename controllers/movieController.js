// Importiamo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}


function show(req, res) {
    // recuperiamo id da param
    const id = req.params.id;

    // prepariamo query per singolo film
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // prepariamo la query per reviews del book
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // aggiungiamo la connesione per la richiesta
    connection.query(movieSql, [id], (err, movieResult) => {
        // gestiamo errore server mysql
        if (err) return res.status(500).json({ error: "Database error" })
        // gestiamo anche il 404
        if (movieResult.length === 0) return res.status(404).json({ error: "Movie not found" })

        // creiamo oggetto singolo film
        const singleMovie= movieResult[0];
        singleMovie.image = req.imagePath + singleMovie.image;


        // aggiungiamo connesione per richiesta reviews relative
        connection.query(reviewSql, [id], (err, reviewResult) => {
            // gestiamo errore server mysql
            if (err) return res.status(500).json({ error: "Database error" })
            // aggiungiamo le reviews sull'oggetto del singolo film
            singleMovie.reviews = reviewResult;

            // ritorniamo il risultato ottenuto
            res.json(singleMovie);
        });
    });
}

module.exports = { index, show }