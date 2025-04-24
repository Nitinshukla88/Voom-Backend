const { validationResult } = require("express-validator");
const Captain = require("../models/captainModel");
const blackListedToken = require("../models/blackListedToken");

const registerCaptain = async(req, res) => {

    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ message : "Error Occured", details : errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        if(!fullname || !email || !password || !vehicle){
            return res.status(400).json({ message : "All fields are required"});
        }

        const isCaptainAlreadyExists = await Captain.findOne({ email : email });

        if(isCaptainAlreadyExists){
            return res.status(400).json({ message : "Captain Already exists"});
        }

        const hashedPassword = await Captain.hashPassword(password);

        const newCaptain = new Captain({
            fullname : {
                firstName : fullname.firstname,
                lastName : fullname.lastname,
            },
            email : email,
            password : hashedPassword,
            vehicle : {
                plate : vehicle.plate,
                color : vehicle.color,
                capacity : vehicle.capacity,
                vehicleType : vehicle.vehicleType
            }
        });

        const token = await newCaptain.generateAuthToken();

        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "lax",
            secure : false
        })

        await newCaptain.save();

        return res.json( { message : "Captain Registered Successfully", captain : newCaptain });

    }catch(error){

        console.log(error);
        return res.status(500).json({ message : "Error", details : error })

    }
}


const loginCaptain = async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ message : "Error Occured", details : errors.array() });
    }
    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message : "All fields are required"});
        }

        const captain = await Captain.findOne({ email : email }).select("+password");

        if(!captain){
            return res.status(400).json({ message : "Invalid Credentials"});
        }

        const isPasswordMatched = await captain.comparePassword(password);

        if(!isPasswordMatched){
            return res.status(400).json({ message : "Invalid Credentials"});
        }

        const token = await captain.generateAuthToken();

        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "lax",
            secure : false
        });

        return res.json({ captain });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })
    }
}

const getCaptainProfile = async(req, res) => {

    try{
        const captainId = req.user._id;

        const captain = await Captain.findById(captainId);

        if(!captain){
            return res.status(400).json({ message : "Captain Not Found"});
        }

        return res.json({ captain });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })
    }
}

const logoutCaptain = async(req, res) => {

    try{

        const { token } = req.cookies;

        if(!token){
            return res.status(401).json({ message : "Unauthorized"});
        }

        const blackListToken = new blackListedToken({ token : token });

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
module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain};