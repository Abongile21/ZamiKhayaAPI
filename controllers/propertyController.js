const Property = require('../models/propertyModel');
const imageUpload = require('./images.controller');

exports.createProperty = async (req, res) => {
    try {
        const propertyData = req.body;

        console.log(propertyData)
    
        const files = req.files;
        const imageUrls = [];
        if (files.images) {
            for (let image of files.images) {
                const uploadResult = await imageUpload.UploadImage(image);
                imageUrls.push(uploadResult.Location);
            
            }
        }
        // propertyData.landlord = req.user.id
        if(imageUrls && propertyData){
            propertyData.images = imageUrls;
            const property = new Property(propertyData);
            await property.save(); 
        }
        res.status(201).json(property);
                
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const propertyData = req.body;
        const images = req.files ? req.files.images : null;
        const imageUrls = [];

        if (images) {
            for (let image of images) {
                const uploadResult = await imageUpload.UploadImage(image);
                imageUrls.push(uploadResult.Location);
            }
        }

        if (imageUrls.length > 0) {
            propertyData.images = imageUrls;
        }

        const property = await Property.findByIdAndUpdate(req.params.id, propertyData, { new: true, runValidators: true });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAllProperties = async (req, res) => {
    try {
        await Property.deleteMany({});
        res.status(200).send({ message: "Successfully deleted all properties!" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting properties", error });
    }
};
