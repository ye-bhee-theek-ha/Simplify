const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const UserSchema = mongoose.Schema(
    {

        FirstName: {
            type: String,
            requied: true,
        },
        LastName: {
            type: String,
            requied: true,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
        },
        Password: {
            type: String,
            requied: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        confirmationToken: {
            type: String,
        },
        isConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        }

    },
    {
        timestamps: true
    }   
);

UserSchema.pre("save", async function (next) {
    
    if (!this.isModified("Password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};


const User = mongoose.model("User", UserSchema);
module.exports = User;