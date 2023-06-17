const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Order = require('../models/orderSchema');

router.post('/addOrder',asyncHandler(async(req,res,next)=>{
    try{
        const {orderItems,shippingAddress,paymentMethod,totalPrice} = req.body;
        if (orderItems.length===0){
            res.status(401);
            throw new Error("Cart is empty!! Add items to create order");
        }
        else{
            const order = new Order({
                orderItems,
                user:req.user,
                shippingAddress,
                paymentMethod,
                totalPrice
            })

            const order_added = await order.save();
            res.status(200)
            res.json(order_added);
        }

    }
    catch(error){
        next(error);
    }
}))

router.get("/getOrder/:id",asyncHandler(async(req,res,next)=>{
    try{
        const order_by_id = await Order.findById(req.params.id).populate('user','firstName lastName email');
        if (order_by_id){
            res.json(order_by_id);
        }
        else{
            throw new Error("Order Not Found");
        }
    }
    catch(error){
        next(error);
    }
}))

router.get('/userOrders',asyncHandler(async(req,res,next)=>{
    try{
        const orders = await Order.find({user:req.user});
        res.status(200)
        res.json(orders);
    }
    catch(error){
        next(error);
    }
}))

module.exports = router;