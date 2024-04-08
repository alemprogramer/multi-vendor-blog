exports.getAllUserController = async (req,res,next)=>{
    try {
        res.end('all user');
    } catch (error) {
        next(error)
    }
}