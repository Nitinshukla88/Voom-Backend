const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./src");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(
        `Server started Successfully on port ${process.env.PORT}`
    )
})