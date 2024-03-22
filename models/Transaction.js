const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Define the transaction schema
const transactionSchema = new Schema({
  property: {
    type: String,
    ref: 'Property', // Reference to the Property model
    required: true
  },
  buyerName: {
    type: String,
    ref: 'User', // Reference to the User model
    required: true
  },
  sellerName: {
    type: String,
    ref: 'User', // Reference to the User model
    required: true
  },
  transactionType: {
    type: String,
    enum: ['Sale', 'Rent'], // Transaction types: Sale or Rent
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
},  {timestamps: true} );

// Create the Transaction model
const transactionModel = mongoose.model('Transaction', transactionSchema);

// Export the Transaction model
module.exports = transactionModel