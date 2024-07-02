const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, {
    timestamps: true
});

const Favourites = mongoose.model('Favourites', favouritesSchema);

module.exports = Favourites;
