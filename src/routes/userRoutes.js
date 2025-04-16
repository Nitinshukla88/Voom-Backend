const express = require("express");

const userRouter = express.Router();

const { body } = require("express-validator");

const {registerUser, loginUser} = require("../cantrollers/userCantroller");

userRouter.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min : 3}).withMessage("firstname should be at least 3 character long!"),
    body("password").isLength({ min : 8 }).withMessage("password must be at least 8 characters long!")
], registerUser);

userRouter.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min : 8 }).withMessage("password must be at least 8 characters long!")
], loginUser);

module.exports = userRouter;