//all npm packages are imported here
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

//all custom made models are imported here
const middlewares = require('./middlewares/middleware');
const routes = require('./routers/router')
const app = express();

app.use(middlewares);
routes(app)



const PORT = process.env.PORT || 3000

mongoose.connect(process.env.database_url)
    .then(()=>{
        console.log(`server is connected`);
        app.listen(PORT,()=>{
            console.log(`server is running on port : ${PORT}`);
        })
    })


