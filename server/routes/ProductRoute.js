const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Product = require("../models/productSchema");

router.get('/',asyncHandler(async(req,res,next)=>{
    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(error){
        next(error);
    }
}))

router.get('/:id',asyncHandler(async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        if (product){
            res.json(product);
        }
        else{
            throw new Error("NOT FOUND");
        }
    }
    catch(err){
        const error = {status:404,message:`Product with ID ${req.params.id} not found`};
        next(error);
    }
}))


module.exports = router;