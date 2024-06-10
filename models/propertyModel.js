const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Sale', 'Rental', 'Booking'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    parking: {
        type: String,
        enum: ['indoor', 'outdoor', 'no parking'],
        required: true
    },
    rooms:{
        type: Number,
        required: true
    },
    electricity: {
        type: String,
        enum: ['Sharing','Indivual'],
        required: true
    },
    bathroom: {
        type: String, 
        enum: ['Sharing','Indivual']
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: false
    }
    
}, {
    timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
