

const mongoose = require("mongoose");


const blackListedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '86400' 
    }
}, { timestamps: true });


const blackListedToken = mongoose.model("blackListedToken", blackListedTokenSchema);


module.exports = blackListedToken;