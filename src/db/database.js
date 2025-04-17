const mongoose = require("mongoose");

async function connectDB() {
    try{
        
        await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

    }catch(error){
        console.log("Error while connecting to the database", error);
    }
}

module.exports = connectDB;