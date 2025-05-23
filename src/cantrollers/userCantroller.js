
const blackListedToken = require("../models/blackListedToken");

const User = require("../models/userModel");

const { validationResult } = require("express-validator")


const registerUser = async(req, res) => {
    
    const { fullname, email, password, sokcetId } = req.body;

    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){

            return res.status(400).json({ message : "Error Occured", details : errors.array() });
        }

        if( !fullname || !email || !password){

            return res.status(400).json({ message : "All fields are required"});

        }

        const user = await User.findOne({ email : email });

        if(user){
            return res.json("User Already exists");
        }

        const hashedPassword = await User.hashPassword(password);

        const newUser = new User({
            fullname : {
                firstName : fullname.firstname,
                lastName : fullname.lastname,
            },
            email : email,
            password : hashedPassword
        })

        const token = await newUser.generateAuthToken();

        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "lax",
            secure : false
        })

        await newUser.save();

        return res.json({ newUser });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })

    }
    
}

const loginUser = async(req, res) =>{

    try{
        const { email, password } = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ message : "Error Occured", details : errors.array() });
        }
        
        if(!email || !password){
            return res.status(400).json({ message : "All fields are required"});
        }

        const user = await User.findOne({ email : email }).select("+password");
        if(!user){
            return res.status(401).json({ message : "Invalid Credentials"});
        }

        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return res.status(401).json({ message : "Invalid Credentials"});
        }
        const token = await user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "lax",
            secure : false
        });

        return res.json({ user });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })
    }
}


const getUserProfile = async(req, res) => {
    try{
        const user = req.user;
        return res.json({ user });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })
    }
}


const logoutUser = async(req, res) => {

    try{
        const { token } = req.cookies;

        const blackListToken = new blackListedToken({
            token : token,
        }); 

        await blackListToken.save();

        res.clearCookie("token", {
            httpOnly : true,
            sameSite : "strict",
        });

        return res.json({ message : "Logged Out Successfully" });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })
    }
}

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };