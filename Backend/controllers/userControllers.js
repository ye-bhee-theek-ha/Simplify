const User = require("../models/useModels")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { sendConfirmationEmail, sendPasswordRecoveryEmail }  = require("../middlewares/sendEmail")

const registerUser = asyncHandler (async (req, res) => {

    const {FirstName, LastName, Email, Password } = req.body;
    
    const userExists = await User.findOne({Email})

    if (userExists) {
        res.status(400);
        throw new Error("User already Exists");
    }

    const confirmationToken = generateToken();

    const user = await User.create({
        FirstName, LastName, Email, Password, confirmationToken
    })

    if (user) {

        //sendConfirmationEmail(user.Email, user.confirmationToken);

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
});


const confirm = (async (req, res) => {
    const confirmationToken = req.params.confirmationToken;
    const newconfirmationToken = generateToken();

    try {
        const user = await User.findOne({ confirmationToken });

        if (!user) {
            throw new Error("Invalid confirmation token");
        }

        // Update user's isConfirmed field
        user.isConfirmed = true;
        user.confirmationToken = newconfirmationToken;
        await user.save();

        res.status(200).json({ message: "Email confirmed successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error confirming email", error: error.message });
    }
});


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

    const { Email } = req.body;

    console.log({Email})

    try {
        const user = await User.findOne({ Email });
      
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const verificationToken = user.confirmationToken;

        //sendPasswordRecoveryEmail(Email, verificationToken);
        
        res.status(200).json({ verificationToken });
      } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

})

const resetPassword = asyncHandler ( async (req, res) => {
    //add server side password checker
    const { newPassword, confirmationToken } = req.body;

    console.log(req.body);

    const newconfirmationToken = generateToken();

    try {
        const user = await User.findOne({ confirmationToken });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update user's password
        ////fix error Hashing twice
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(newPassword, salt);
        user.confirmationToken = newconfirmationToken; // Reset confirmation token
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = { registerUser, loginUser , forgotPassword, resetPassword, confirm};