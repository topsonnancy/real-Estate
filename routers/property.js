const express = require('express');
const router = express.Router();
const propertyController = require("../controllers/propertyController")
const {verifyAndAuthenticate, verifyAdminOnly} = require("../middlewares/verify")


router.route("/:id")
.put(verifyAdminOnly, propertyController.updateProperty)
.get(verifyAndAuthenticate, propertyController.getProperty)
.delete(verifyAdminOnly, propertyController.deleteProperty)

router.route("/")
.post(verifyAdminOnly, propertyController.createProperty) 
.get(verifyAndAuthenticate, propertyController.getAllProperties)


module.exports = router
