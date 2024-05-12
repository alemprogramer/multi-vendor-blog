const { verifyJWT } = require("../utils/jwt");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const tokenData = await verifyJWT(token, process.env.ACCESS_TOKEN_SECRET);
        if(tokenData.ext < Date.now()){
            return res.status(401).json({message: 'Unauthorized'});
        }
        const user = await User.findById(tokenData.id);
        req.user = user;
        req.id = user._id;

        next();
    } catch (error) {
        next(error);
    }
}