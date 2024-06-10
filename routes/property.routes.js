// routes/propertyRoutes.js
const express = require('express');
const propertyController = require('../controllers/propertyController');
const router = express.Router();


router.post('/properties', propertyController.createProperty)

router.get('/properties', propertyController.getAllProperties);

router.get('/properties/:id', propertyController.getPropertyById);

router.put('/properties/:id', propertyController.updateProperty);

router.delete('/properties/:id', propertyController.deleteProperty);

module.exports = router;
