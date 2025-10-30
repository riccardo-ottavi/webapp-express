const express = require("express");

// settiamo il router
const router = express.Router();

// importiamo il controller della risorsa
const movieController = require('../controllers/movieController');


module.exports = router;