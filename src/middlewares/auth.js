const jwt = require('jsonwebtoken');
const User  = require('../models/userModel');
const blackListedToken = require('../models/blackListedToken');
const Captain = require('../models/captainModel');

const userAuth = async(req, res, next) => {

    try{

        const { token } = req.cookies;
        
        if(!token){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const isTokenBlackListed = await blackListedToken.findOne({ token : token });
        
        if(isTokenBlackListed){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        req.user = user;
        
        next();

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error Occured",
            details : error
        })
    }
}


const captainAuth = async(req, res, next) => {

    try{
            
            const { token } = req.cookies;
            
            if(!token){
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
    
            const isTokenBlackListed = await blackListedToken.findOne({ token : token });
            
            if(isTokenBlackListed){
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            const captain = await Captain.findById(decoded._id);
    
            req.user = captain;
            
            next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error Occured",
            details : error
        })
    }
}


module.exports = { userAuth, captainAuth };