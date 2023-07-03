const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Order = require("../models/orderSchema");
const asyncHandler = require("express-async-handler");

router.get('/getUsers',asyncHandler(async(req,res,next)=>{
    try{
        const users = await User.find({});
        const idtoDelete =  users.findIndex(x=>x._id.toString()===req.user);
        if (idtoDelete!==-1){
            users.splice(idtoDelete,1);
        }
        res.json(users);
    }
    catch(error){
        next(error);
    }
}))

router.delete('/deleteuserbyid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        if (user){
            await User.findByIdAndDelete(req.params.id);
            const users = await User.find({});
            res.json(users);
        }
    }
    catch(error){
        next(error);
    }
}))

router.get('/getuserbyid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);
    }
    catch(error){
        next(error);
    }
}))

router.put('/updateuserbyid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        const {firstName,lastName,email,isAdmin} = req.body;
        if (user){
            user.firstName = firstName || user.firstName;
            user.lastName = lastName ||user.lastName;
            user.email = email || user.email;
            user.isAdmin = isAdmin;
            const updated_user = await user.save();
            res.json({
                _id: updated_user._id,
                firstName: updated_user.firstName,
                lastName: updated_user.lastName,
                email:updated_user.email,
                isAdmin:updated_user.isAdmin
            })
        }
        else{
            res.status(401);
            throw new Error("User Not Found");
        }
    }
    catch(error){
        next(error);
    }
}))





// Products
router.get('/getProducts',asyncHandler(async(req,res,next)=>{
    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(error){
        next(error);
    }
}))

router.delete('/deleteproductbyid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        if (product){
            await Product.findByIdAndDelete(req.params.id);
            res.json({message:"PRODUCT DELETED SUCCESSFULLy"});
        }
    }
    catch(error){
        next(error);
    }
}))

router.get('/getproductbyid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id).select('-password');
        res.json(product);
    }
    catch(error){
        next(error);
    }
}))

router.put('/updateproductbyid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        if (product){
            product.name = req.body.name || product.name;
            product.image = req.body.image || product.image;
            product.brand = req.body.brand || product.brand;
            product.category = req.body.category || product.category;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.sizes = req.body.sizes || product.sizes;
            const updated_product = await product.save();
            res.json(updated_product)
        }
        else{
            res.status(401);
            throw new Error("Product Not Found");
        }
    }
    catch(error){
        next(error);
    }
}))

router.post('/createProduct',asyncHandler(async(req,res,next)=>{
    try{
        const {name,image,brand,category,price,description,countInStock,sizes} = req.body;
        const product_to_be_saved = {
            name:name,
            image:image,
            brand:brand,
            category:category,
            price:price,
            description:description,
            countInStock:countInStock,
            user:req.user,
            sizes:sizes
        }
        const product = new Product(product_to_be_saved);
        const saved_new_product = await product.save();
        res.json(saved_new_product);
        
    }
    catch(error){
        next(error);
    }
}))

router.get('/getOrders',asyncHandler(async(req,res,next)=>{
    try{
        const orders = await Order.find({});
        res.json(orders);
    }
    catch(error){
        next(error);
    }
}))

router.get('/updatetodelivered/:id',asyncHandler(async(req,res,next)=>{
    try{
        const order = await Order.findById(req.params.id);
        if (order){
            order.isDelivered = true
            order.deliveredAt = Date.now()
        }
        const updated_order = await order.save();
        res.json(updated_order);
    }
    catch(error){
        next(error);
    }
    
}))



module.exports = router;