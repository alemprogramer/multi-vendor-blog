exports.getAllUserController = async (req,res,next)=>{
    try {
        console.log(req.user);
        res.status(200).json({msg:"test message"})
    } catch (error) {
        next(error)
    }
}