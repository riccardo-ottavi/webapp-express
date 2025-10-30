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
    
    const id = req.params.id
    console.log("ID richiesto:", id); // 👈 Aggiungi questo
    const sql = `
        SELECT *
        FROM movies
        JOIN reviews
        ON reviews.movie_id = movies.id
        WHERE movies.id = ?
    `;
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        if (results.length === 0) return res.status(404).json({ error: 'Film not found' })
        res.json(results[0]);
    });
}

module.exports = { index, show }