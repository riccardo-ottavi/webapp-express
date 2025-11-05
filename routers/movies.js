const express = require("express");

// settiamo il router
const router = express.Router();

// importiamo il controller della risorsa
const movieController = require('../controllers/movieController');

// Rotte di CRUD sulla risorsa 
// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store reviews
router.post('/:id/reviews', movieController.storeReview);


module.exports = router;