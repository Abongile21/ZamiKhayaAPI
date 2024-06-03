const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customerName: { 
    type: String,
    required: true 
},
  rentalStartDate: { 
    type: Date, 
    required: true 
},
  rentalEndDate: {
    type: Date, 
    required: true
  },
  rentalAmount: { 
    type: Number, 
    required: true 
}
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);
