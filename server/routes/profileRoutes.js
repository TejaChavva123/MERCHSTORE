const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const {generateAccesToken} = require("../helpers/generateJWTtoken");
const {updatevalidateSchema, passwordvalidateSchema} = require("../models/validateSchema");

router.get('/getDetails',asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user)
    if (user) {
        res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName:user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        })
    } 
    else {
        res.status(404)
        throw new Error('User not found')
    }
}))

router.put('/updateDetails',asyncHandler(async(req,res,next)=>{
    try{
        const user = await User.findById(req.user);
        await updatevalidateSchema.validateAsync({email:req.body.email,firstName:req.body.firstName,lastName:req.body.lastName});
        if (user) {
            if (req.body.firstName){
                user.firstName = req.body.firstName
            }
            if (req.body.lastName){
                user.lastName = req.body.lastName
            }
            if (req.body.email){
                user.email = req.body.email
            }
            if (req.body.password){
                const vali = {
                    password:req.body.password
                }
                try{
                    await passwordvalidateSchema.validateAsync(vali);
                }
                catch(err){
                    if (err.isJoi===true){
                        err.status = 422;
                    }
                    next(err);
                }
                user.password = req.body.password;
            }
            const updated_user = await user.save();
            const {access_token,error} = await generateAccesToken(updated_user._id);
            if (error){
                throw createHttpError.InternalServerError();
            }
            res.json({
                _id: updated_user._id,
                firstName: updated_user.firstName,
                lastName:updated_user.lastName,
                email: updated_user.email,
                isAdmin: updated_user.isAdmin,
                token: access_token,
                message:"Profile Updated Successfully"
            })
        } 
        else {
            res.status(404)
            throw new Error('User not found')
        }}
    catch(err){
        next(err);
    }
}))

module.exports = router;