exports.getAllUserController = async (req,res,next)=>{
    try {
        res.send('all user')
    } catch (error) {
        next(error)
    }
}