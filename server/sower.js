const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/user");
const products = require("./data/products");

// models
const User = require("./models/userSchema");
const Product = require("./models/productSchema");
const Order = require('./models/orderSchema');

const ConnectDB = require("./connect/db");
ConnectDB();


const importData = async ()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(product=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProducts);
        console.log("Data Imported");
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async ()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data deleted");
        process.exit();
    }
    catch(err){
        console.log(error);
        process.exit(1);
    }
}

importData();