const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { isAdmin, isLandlordOrAdmin } = require('../middleware/auth.middleware');

router.post('/properties',isLandlordOrAdmin,propertyController.createProperty);
router.get('/properties', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyById);
router.put('/properties/:id',propertyController.updateProperty);
router.delete('/properties/:id',isLandlordOrAdmin, propertyController.deleteProperty);
router.delete('/properties',isAdmin, propertyController.deleteAllProperties);

module.exports = router;
