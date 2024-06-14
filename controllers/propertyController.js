const Property = require('../models/propertyModel');

exports.createProperty = async (req, res) => {
    try {
        const propertyData = req.body;
        const property = new Property(propertyData);
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
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
exports.deleteAllProperty = async(req, res)=>{

    try {
        await Property.deleteMany({}); 

        res.status(200).send({ message: "Successfully deleted all movies!" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting movies", error });
    }
}
}