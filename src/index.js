const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

app.get("/", (req, res)=>{
    res.send(`Server started listening on PORT ${process.env.PORT}`);
})

module.exports = app;