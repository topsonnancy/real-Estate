require("dotenv").config()  
const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
    console.log("Database connection established")

    app.listen(PORT, (req, res) => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
