const express = require('express');
const rentalController = require('../controllers/rentalController');

const router = express.Router();

router.post('/rentals', rentalController.createRental);
router.get('/rentals', rentalController.getRentals);
router.get('/rentals/:id', rentalController.getRental);
router.patch('/rentals/:id', rentalController.updateRental);
router.delete('/rentals/:id', rentalController.deleteRental);

module.exports = router;
