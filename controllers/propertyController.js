const Property = require("../models/Property")

const createProperty = async (req, res) => {
 const {propertyType, address, price, description, image, status} = req.body
    try {
        const newProperty = await Property.create({
            propertyType: propertyType,
            address: address,
            price: price,
            description: description,
            image: image,
            status: status

        })
        res.status(200).json(newProperty)
    } catch (error) {
        res.status(500).json(`Error:${error.message}`)
    }
}

const updateProperty = async (req, res) => {
    const {propertyType, address, price, description, image, status} = req.body
    try {
        const foundProperty = await Property.findOne({_id: req.params.id}).exec()
        if (!foundProperty) return res.status(302).json("No property with id found")
        if (propertyType) foundProperty.property = propertyType
        if (address) foundProperty.address = address
        if (price) foundProperty.price = price
        if (description) foundProperty.description = description
        if (image) foundProperty.image = image
        if (status) foundProperty.status = status
        const result = await foundProperty.save()
        res.status(200).json(result)
 
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
        
    }   
}

const deleteProperty = async (req, res) => {
    const {propertyType, address, price, description, image, status} = req.body
    try {
        const foundProperty = await Property.findOne({_id: req.params.id}).exec()
        if (!foundProperty) return res.status(302).json("No property with id found")
        const result = await foundProperty.deleteOne({ _id: req.params.id})
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
        
    }

}

const getProperty = async (req, res) => {
    const {propertyType, address, price, description, image, status} = req.body
    try {
        const foundProperty = await Property.findOne({_id: req.params.id}).exec()
        if (!foundProperty) return res.status(302).json("No property with id found")
        res.status(200).json(foundProperty)
        
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
        
    }
}

const getAllProperties = async (req, res) => {
    try {
        const foundProperties = await Property.find().exec()
        res.status(200).json(foundProperties)
        
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
        
    }
}


module.exports = {createProperty, updateProperty, deleteProperty, getProperty, getAllProperties }
