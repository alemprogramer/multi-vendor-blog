const http = require('http');
const router = require('./routers/router');
const {parseData,color} = require('./utils/dataParser');
const middlewares = require('./middlewares/middleware');
const mongoose = require('mongoose');

const server = http.createServer((req, res) => {
    const startTime = Date.now();
    middlewares(req, res,()=>console.log('one'),()=>console.log('two'))
    parseData(req,res,router);
    // router(req, res)

    res.on('finish', () => {
        const endTime = Date.now(); 
        const elapsedTime = endTime - startTime; 
        console.log(`${req.method} ${req.url} ${color(res.statusCode)} \x1b[0m - ${elapsedTime}ms`);
    })
})

const PORT =process.env.PORT || 3001
mongoose.connect(process.env.database_url)
.then(() =>{
    console.log(`server is connected`);
    server.listen(PORT,() => {
        console.log(`server is running on port ${PORT}`);
    });
})

