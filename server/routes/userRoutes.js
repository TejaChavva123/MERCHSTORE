const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {loginvalidateSchema} = require("../models/validateSchema");
const {validateSchema} = require("../models/validateSchema")
const createHttpError = require("http-errors");
const {generateAccesToken} = require("../helpers/generateJWTtoken");

const User = require("../models/userSchema");

router.post('/login',asyncHandler(async(req,res,next)=>{
    try{
        //validation of the data
        const result = await loginvalidateSchema.validateAsync(req.body);
        const {email} = result;

        //check whether user exists or not
        const user_exists = await User.findOne({email:result.email});
        if (!user_exists){
            res.status(401).send({message: `User with email: ${email} not registered`});
        }
        //checking password
        const isMatch = await user_exists.isPasswordValid(result.password);
        if (!isMatch){
            res.status(401).send({ message: "Invalid Email or Password" });
        }
        const {access_token,error} = await generateAccesToken(user_exists._id);
        if (error){
            throw createHttpError.InternalServerError();
        }
        if (user_exists && isMatch){
            res.json({
                _id: user_exists._id,
                firstName: user_exists.firstName,
                lastName : user_exists.lastName,
                email: user_exists.email,
                isAdmin: user_exists.isAdmin,
                token : access_token
            })
        }
    }
    catch(error){
        if (error.isJoi == true){
            error.status = 422
        }
        next(error);
    }
}))

router.post('/register',asyncHandler(async(req,res,next)=>{
    try{
        // validating the schema
        await validateSchema.validateAsync(req.body);
        const {firstName,lastName,email,password} = req.body;

        const user_exists = await User.findOne({email})
        if (user_exists){
            throw createHttpError.Conflict(`User with ${email} already exists`)
        }

        const new_user = new User({firstName,lastName,email,password});
        const saved_user = await new_user.save();
        const {access_token,error} = await generateAccesToken(saved_user._id);
        if (error){
            throw createHttpError.InternalServerError();
        }
        res.json({
            firstName: saved_user.firstName,
            lastName : saved_user.lastName,
            email: saved_user.email,
            isAdmin: saved_user.isAdmin,
            token : access_token
        })
    }
    catch(error){
        if (error.isJoi===true){
            error.status = 422
        }
        next(error);
    }
}))

module.exports = router;