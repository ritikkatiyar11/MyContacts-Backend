const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');
const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        const error = new Error("Please fill the mandatory fields");
        error.statusCode = 400; // Set status on error object
        return next(error); // Pass the error to the errorHandler
    }

    const availableUser = await User.findOne({ email });
    if (availableUser) {
        const error = new Error("Email already exists");
        error.statusCode = 400;
        return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username,
            email,
            password: hashPassword
        });

        res.status(201).json(user);
        console.log("User created");

    } catch (error) {
        error.statusCode = 500; // Set a server error code
        next(error); // Pass the error to errorHandler
    }
});





const login = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        const error = new Error("Please fill the mandatory fields");
        error.statusCode = 400; 
        return next(error); 
    }

    const availableUser = await User.findOne({ email });
    
    if (!availableUser) {
        const error = new Error("User does not exist");
        error.statusCode = 400;
        return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(password, availableUser.password);
    if (!isPasswordMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return next(error);
    }
    const accessToken= await jwt.sign({
        user:{
            id:availableUser.id,
            username:availableUser.username,
            email:availableUser.email
        },
        

    },process.env.private_key,{expiresIn:"1m"})


    res.status(200).json(accessToken);
});



const currUser=asyncHandler( async(req,res)=>{
    res.status(200).json({ritik:"hot"})
    
})

module.exports={register,login,currUser};
