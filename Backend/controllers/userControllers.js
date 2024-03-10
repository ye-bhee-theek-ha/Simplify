const User = require("../models/useModels")
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler (async (req, res) => {

    const {FirstName, LastName, Email, Password } = req.body;
    
    const userExists = await User.findOne({Email})

    if (userExists) {
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        FirstName, LastName, Email, Password
    })

    if (user) {
        res.status(201).json({
            _id : user._id,
            FirstName : user.FirstName,
            LastName : user.LastName,
            Email : user.Email,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error("ERR Occured");

    }
})


const loginUser = asyncHandler (async (req, res) => {

    const { Email, Password } = req.body;
    
    const user = await User.findOne({ Email });

    // res.status(201).json({
    //     _id : user._id,
    //     FirstName : user.FirstName,
    //     LastName : user.LastName,
    //     Email : user.Email,
    //     Password: user.Password
    // })

    if (user  && await (user.matchPassword(Password))) {
        res.status(201).json({
            _id : user._id,
            FirstName : user.FirstName,
            LastName : user.LastName,
            Email : user.Email,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error("Wrong Password or Email");
    }
})

const forgotPassword = asyncHandler (async (req, res) => {
    console.log("forgotPassword")
})

const resetPassword = asyncHandler (async (req, res) => {
    console.log("resetPassword")
})

module.exports = { registerUser, loginUser , forgotPassword, resetPassword};