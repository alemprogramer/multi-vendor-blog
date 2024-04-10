const User = require('../models/User');
const {hash,compare} = require('../utils/passwordEncrypt');
exports.userRegisterController = async (req,res,next) => {
    try {
        console.log(req.body);
        const {email,password} = req.body
        if(!email){
            return res.status(403).json({message: "Please enter your email address"})
        }
        if(!password){
            return res.status(403).json({message: "Please enter your password address"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({message: "user is already exist"})
        }
        
        let passwordHash =await  hash(password,11);

        await User.create({email,password:passwordHash,name:email.split('@')[0]});

        res.status(200).json({message: 'User created successfully'});
        
    } catch (error) {
        console.log(error);
        res.end(error);
        // next(error);
    }
}

exports.userLoginController = async (req,res,next) => {
    try {
        res.end('login');
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}

exports.refreshTokenController = async (req,res,next) => {
    try {
        res.end('refreshToken');
    } catch (error) {
        console.log(error);
        res.end(error);
    }
}