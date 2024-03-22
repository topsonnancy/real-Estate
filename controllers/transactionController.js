const Transaction = require('../models/Transaction');

// Create a new transaction
const createTransaction = async (req,res) => {
const {property, buyerName, sellerName, transactionType, amount} = req.body
 try {
    const newTransaction = await Transaction.create({
        property: property,
        buyerName: buyerName,
        sellerName: sellerName,
        transactionType: transactionType,
        amount: amount

    })
    res.status(201).json(newTransaction)

 } catch (error) {
    res.status(500).json(`Error: ${error.message}`) 
 }
}

// Update transaction

const updateTransaction = async (req, res) => {
const { property, buyerName, sellerName, transactionType, amount } = req.body; 
    try {
    const foundTransaction = await Transaction.findOne({_id: req.params.id}).exec();
    if (!foundTransaction) return res.status(401).json("Transaction not found");
    if(property) foundTransaction.property = property
    if(buyerName) foundTransaction.buyerName = buyerName
    if(sellerName) foundTransaction.sellerName = sellerName
    if(transactionType) foundTransaction.transactionType = transactionType
    if(amount) foundTransaction.amount = amount

    const result = await foundTransaction.save()
        
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)  
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const foundTransaction = await Transaction.deleteOne({_id: req.params.id}).exec();
        if (!foundTransaction) return res.status(401).json("Transaction not found");
        res.status(200).json(foundTransaction)
}
 catch (error) {
        res.status(500).json(`Error: ${error.message}`)  
    }
}

const getTransaction = async (req, res) => {
 try {
    const foundTransaction = await Transaction.findOne({_id: req.params.id}).exec();
    if (!foundTransaction) return res.status(401).json("Transaction not found");
    res.status(200).json(foundTransaction)

 } catch (error) {
    res.status(500).json(`Error: ${error.message}`) 
 }
}

const getAllTransaction = async (req, res) => {
    try {
        const foundTransaction = await Transaction.find().exec();
        res.status(200).json(foundTransaction);
}
 catch (error) {
        res.status(500).json(`Error: ${error.message}`) 
 }
}




module.exports = {createTransaction, updateTransaction, deleteTransaction, getTransaction, getAllTransaction}
    