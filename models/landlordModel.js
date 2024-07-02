const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Landlord = mongoose.model('Landlord', landlordSchema);

module.exports = Landlord;
