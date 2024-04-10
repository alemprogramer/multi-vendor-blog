const User = require("../models/User")

exports.getAllUserController = async (req,res,next)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const skip = (page - 1) * pageSize;
        const user = await User.find().limit(pageSize).skip(skip).select('-password');
        res.status(200).json({
            user: user,
            page,
            size: pageSize
        })
    } catch (error) {
        next(error)
    }
}