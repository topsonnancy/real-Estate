require("dotenv").config()  
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");

// initialize express
const app = express();


// initialize Json 
app.use(express.json());

// Connection to Database
connectDB()

// Register Route
app.use("/api/register", require("./routers/auth/register"))
app.use("/api/login", require("./routers/auth/login"))
app.use("/api/user", require("./routers/user"))
app.use("/api/property", require("./routers/property"))
app.use("/api/transaction", require("./routers/transaction"))


// Register Port
const PORT = process.env.PORT || 5000;


mongoose.connection.once("open", () => {
    console.log("Database connection established")

 // Register Server   
    app.listen(PORT, (req, res) => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
