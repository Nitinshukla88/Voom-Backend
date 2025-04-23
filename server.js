const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./src");
const connectDB = require("./src/db/database");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connectDB().then(()=> {
    console.log("Database connected Successfully");
    server.listen(PORT, ()=>{
        console.log(
            `Server started Successfully on port ${process.env.PORT}`
        )
    });
    
}).catch(()=> console.log("Database is not connected !"))




