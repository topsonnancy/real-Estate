require("dotenv").config()  
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");


const app = express();

app.use(express.json());
connectDB()

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
    console.log("Database connection established")

    app.listen(PORT, (req, res) => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
