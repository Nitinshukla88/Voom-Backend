const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First Name must be 3 characters long!"],
        },
        lastName: {
            type: String,
            minLength: [3, "Last Name must be 3 characters long!"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be eight characters long!"],
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle:{
        plate : {
            type : String,
            required : true,
            minLength : [3, "Vehicle Plate must be 3 characters long!"],
        },
        color : {
            type : String,
            required : true,
            minLength : [3, "Vehicle Color must be 3 characters long!"],
        },
        capacity : {
            type : Number,
            required : true,
            min : 1,
        },
        vehicleType : {
            type : String,
            required : true,
            enum : ["car", "bike", "auto"],
        }
    },
    location : {
        latitude : {
            type : Number
        },
        longitude : {
            type : Number
        }
    }
});



captainSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async function (passwordInputByCaptain) {
    const result = await bcrypt.compare(passwordInputByCaptain, this.password);
    return result;
}

captainSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;