const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  
rate:{
  type: Number,
  required: true
}, 
  electricity:{
  type: Array, //provide array whether shared individual
  required: true
},
  rooms:{ 
  type: Number,
  required: true
},

  parking:{
    type: [{
      type: String,
      enum: ['indoor', 'outdoor', 'no parking']
  }],
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
