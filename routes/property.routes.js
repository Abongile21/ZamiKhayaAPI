const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { isAdmin, isLandlordOrAdmin } = require('../middleware/auth.middleware');

router.post('/properties',propertyController.createProperty);
router.get('/properties', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyById);
router.put('/properties/:id', isLandlordOrAdmin,propertyController.updateProperty);
router.delete('/properties/:id', propertyController.deleteProperty);
router.delete('/properties',propertyController.deleteAllProperties);


module.exports = router;
