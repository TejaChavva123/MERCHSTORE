const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");

const admin = asyncHandler(async(req,res,next)=>{
    console.log(req.user);
    if (req.user){
        try{
            const user_by_id = await User.findById(req.user);
            if (user_by_id.isAdmin){
                next();
            }
            else{
                res.status(401);
                throw new Error("Not Authorized as admin.")
            }
        }
        catch(error){
            next(error);
        }
    }
})

module.exports=admin