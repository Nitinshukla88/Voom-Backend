const express = require("express");
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../cantrollers/captainCantroller");
const { captainAuth } = require("../middlewares/auth");

const captainRouter = express.Router();

captainRouter.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("firstname should be at least 3 character long!"),  
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters long!"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Vehicle Plate must be at least 3 characters long!"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle Color must be at least 3 characters long!"),
    body("vehicle.capacity").isNumeric().withMessage("Vehicle Capacity must be a number!"),
    body("vehicle.vehicleType").isIn(["car", "bike", "auto"]).withMessage("Vehicle Type must be either car, bike, or auto!")
], registerCaptain);

captainRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters long!")
], loginCaptain);

captainRouter.get("/profile", captainAuth, getCaptainProfile);
captainRouter.post("/logout", captainAuth, logoutCaptain)

module.exports = captainRouter;