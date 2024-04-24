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
        Gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        Age: {
            type: Number,
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
        Img: {
            type: String,
            required: true,
        },
        confirmationToken: {
            type: String,
            required: true,
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

    console.log(this.Password);
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    console.log(this.Password);
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};


const User = mongoose.model("User", UserSchema);
module.exports = User;