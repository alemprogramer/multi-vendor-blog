const User = require('../models/User');
const { createJWT, verifyJWT } = require('../utils/jwt');
const {hash,compare} = require('../utils/passwordEncrypt');
exports.userRegisterController = async (req,res,next) => {
    try {
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
        next(error);
    }
}

exports.userLoginController = async (req,res,next) => {
    try {
        const {email,password} = req.body
        if(!email){
            return res.status(403).json({message: "Please enter your email address"})
        }
        if(!password){
            return res.status(403).json({message: "Please enter your password address"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        const isUser  = await compare(password, user.password)
        if(!isUser){
            return res.status(404).json({
                    message:'password not match',
                })
        }
        return res.status(200).json({
            message:'user login successful',
            accessToken: await createJWT(
                {
                    id:user._id,
                    ext: Date.now()+1000*60*60*50 //50 minutes
                },
                process.env.ACCESS_TOKEN_SECRET
            ),
            reFreshToken:await createJWT(
                {
                    id:user._id,
                    ext: Date.now()+1000*60*60*50 //50 minutes
                },
                process.env.REFRESH_TOKEN_SECRET 
            ),
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.refreshTokenController = async (req,res,next) => {
    try {
        const {refreshToken} = req.body;
        if(!refreshToken){
            return res.status(403).json({message: 'please give  your refresh token'});
        }

        const isTokenValid = await verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if(!isTokenValid){
            return res.status(403).json({message: 'invalid refresh token'});
        }

        if(isTokenValid.ext < Date.now()){
            return res.status(403).json({message: 'please login again'});
        }

        const user = await User.findById(isTokenValid.id)

        return res.status(200).json({
            message:'Token Refresh Successfully',
            accessToken: await createJWT(
                {
                    id:user._id,
                    ext: Date.now()+1000*60*60*50 //50 minutes
                },
                process.env.ACCESS_TOKEN_SECRET
            ),
            reFreshToken:await createJWT(
                {
                    id:user._id,
                    ext: Date.now()+1000*60*60*50 //50 minutes
                },
                process.env.REFRESH_TOKEN_SECRET 
            ),
        })


    } catch (error) {
        console.log(error);
        res.end(error);
    }
}