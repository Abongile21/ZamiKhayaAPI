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
        enum: ['Sharing','Individual'],
        required: true
    },
    bathroom: {
        type: String, 
        enum: ['Sharing','Individual']
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
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});


propertySchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
