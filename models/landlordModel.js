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
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default: "landlord"
    },
    address: {
        type: String
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
    isAdmin: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

landlordSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Landlord = mongoose.model('Landlord', landlordSchema);

module.exports = Landlord;
