const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const Order = require('../models/orderSchema');

require("dotenv").config();
const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

router.get('/createPayment/:id',asyncHandler(async(req,res,next)=>{
    try{
        const {totalPrice} = await Order.findById(req.params.id);
        const options = {
            amount:totalPrice*100,
            currency:"INR"
        }
        const order = await razorpay.orders.create(options);
        res.json({
            orderId:order.id
        })
    }
    catch(error){
        next(error);
    }
    
}))

router.post('/updatetopaid/:id',asyncHandler(async(req,res,next)=>{
    try{
        const order = await Order.findById(req.params.id);
        const {paymentResult} = req.body;
        if (order){
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = paymentResult;
        }
        const updated_order = await order.save();
        res.json(updated_order);
    }
    catch(error){
        next(error);
    }
    
}))

module.exports = router;


