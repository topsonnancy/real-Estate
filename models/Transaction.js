const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', // Reference to the Property model
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  transactionType: {
    type: String,
    enum: ['Sale', 'Rent'], // Transaction types: Sale or Rent
    required: true
  },
  price: {
    type: Number,
    required: true
  },
},  {timestamps: true} );

// Create the Transaction model
const transactionModel = mongoose.model('Transaction', transactionSchema);

// Export the Transaction model
module.exports = transactionModel