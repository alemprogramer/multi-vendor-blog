exports.getAllUserController = async (req,res,next)=>{
    try {
    console.log("body",req.body)
    console.log("name",req.name)
    res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'JSON data received and parsed successfully' }));

    } catch (error) {
        next(error)
    }
}