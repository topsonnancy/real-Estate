const express = require('express');
const router = express.Router();
const transactionController = require("../controllers/transactionController")
const {verifyAndAuthenticate, verifyAdminOnly} = require("../middlewares/verify")

router.route("/:id")
.put(verifyAndAuthenticate, transactionController.updateTransaction)
.get(verifyAndAuthenticate, transactionController.getTransaction)
.delete(verifyAndAuthenticate, transactionController.deleteTransaction)

router.route("/")
.get(verifyAdminOnly, transactionController.getAllTransaction)
.post(verifyAndAuthenticate, transactionController.createTransaction)

module.exports = router