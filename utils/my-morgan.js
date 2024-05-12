const {color} = require('./dataParser');
module.exports = (req,res)=>{
    const startTime = Date.now();
    res.on('finish', () => {
        const endTime = Date.now(); 
        const elapsedTime = endTime - startTime; 
        console.log(`${req.method} ${req.url} ${color(res.statusCode)} \x1b[0m - ${elapsedTime}ms`);
    })
}