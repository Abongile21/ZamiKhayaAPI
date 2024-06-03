const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  location: { type: String, required: true },
  saleDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true }
  
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
