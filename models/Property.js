const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({

    propertyType:{
        type: String,
        required: true,
    
    },
    address: {
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    description:{
        type: String,   
    },

    image:{
        type: String,
       },

    status: {
    type: String,
    enum: ["available", "sold", "rented"],
    default: "available",
    },
    
    isAdmin:{
        type: Boolean,
        default: false,
     }   
}, {timestamps: true})

const propertyModel = mongoose.model('Property', propertySchema)
module.exports = propertyModel



