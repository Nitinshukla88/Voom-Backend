const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        firstName : {
            type : String,
            required : true,
            minLength : [3, "First Name must be 3 characters long!"]
        },
        lastName : {
            type : String,
            required : true,
            minLength : [3, "Last Name must be 3 characters long!"]
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minLength : [8, "Password must be eight characters long!"],
        select : false
    },
    socketId : {
        type : String
    }
})

userSchema.methods.generateAuthToken = async() => {
    const token = await jwt.sign({_id : this._id}, process.env.JWT_SECRET, { expiresIn : "1d"});
    return token;
}

userSchema.methods.comparePassword = async(passwordInputByUser) => {
    const result = await bcrypt.compare(passwordInputByUser, this.password);
    return result;
}

userSchema.statics.hashPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = User;