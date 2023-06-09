const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require('./connect/db');
const app = express();
require("dotenv").config();

ConnectDB();
// importing the data
// const products = require("./data/products");
const ProductRoutes = require("./routes/ProductRoute");

app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/products',ProductRoutes);
const PORT = process.env.PORT||5000;

app.listen(PORT,console.log(`Server is runnning in ${process.env.NODE_ENV} mode on the port ${PORT}`));