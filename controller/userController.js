exports.getAllUserController = async (req,res,next)=>{
    try {
        res.status(200).json({msg:"test message"})
    } catch (error) {
        next(error)
    }
}