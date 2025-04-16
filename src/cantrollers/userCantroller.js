
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

        await newUser.save();

        return res.json({ token : token , newUser });

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

        return res.json({ token : token, user });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message : "Error", details : error })
    }
}

module.exports = { registerUser, loginUser };