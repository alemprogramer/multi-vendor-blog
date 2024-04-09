const http = require('http');
const router = require('./routers/router');
const parseData = require('./utils/dataParser');
const mongoose = require('mongoose');

const server = http.createServer((req, res) => {
    console.log(`${req.method} :${req.url}`);
    parseData(req,res,router);
})

const PORT =process.env.PORT || 3001
mongoose.connect(process.env.database_url)
.then(() =>{
    console.log(`server is connected`);
    server.listen(PORT,() => {
        console.log(`server is running on port ${PORT}`);
    });
})

