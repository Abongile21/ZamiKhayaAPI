const express = require('express');
const propertyController = require('../controllers/propertyController');
const upload = require('../config/multerConfig');
const router = express.Router();

router.post('/properties', upload.array('images'), propertyController.createProperty);
router.get('/properties', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyById);
router.put('/properties/:id', upload.array('images'), propertyController.updateProperty);
router.delete('/properties/:id', propertyController.deleteProperty);
router.delete('/properties', propertyController.deleteAllProperties);

module.exports = router;
