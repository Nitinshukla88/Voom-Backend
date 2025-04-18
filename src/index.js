const express = require("express");

const app = express();

const cors = require("cors");

const cookieParser = require("cookie-parser")

const userRoutes = require("./routes/userRoutes");

const captainRoutes = require("./routes/captainRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended : true }));

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;