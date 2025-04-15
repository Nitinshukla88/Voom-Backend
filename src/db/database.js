const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(MONGOOSE_CONNECTION_STRING);
}

module.exports = connectDB;