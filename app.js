const http = require('http');
const router = require('./routers/router');
const {parseData,color} = require('./utils/dataParser');
const middlewares = require('./middlewares/middleware');
const myMorgan =require('./utils/my-morgan');
const mongoose = require('mongoose');

const server = http.createServer((req, res) => {
    middlewares(req, res,()=>console.log('one'),myMorgan)
    parseData(req,res,router);
    // router(req, res)
})

const PORT =process.env.PORT || 3001
mongoose.connect(process.env.database_url)
.then(() =>{
    console.log(`server is connected`);
    server.listen(PORT,() => {
        console.log(`server is running on port ${PORT}`);
    });
})

