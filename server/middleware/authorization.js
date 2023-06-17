const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
require("dotenv").config();


const authorization = asyncHandler(async(req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0]==="Bearer") {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
      req.user= decoded.id;
      next()
    } 
    
    catch (error) {
      res.status(401)
      throw new Error('Sorry Token Failed.')
    }
  }
  if (!token) {
    console.log(token)
    res.status(401)
    throw new Error('No Authorization')
  }
})

module.exports = authorization