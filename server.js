const express = require('express');
const app = express();

function test(req, res) {
    return res.end('from test function');
}
app.get('/:ParamId',(req,res,next)=>{console.log('test from middle');next()},(req,res,next)=>{console.log('test from middle2');next()},test);
app.get('/am/:ParamId',test);
app.get('/am/:ParamId/test',test);
app.get('/all', (req, res, next)=>res.end('/all'));
app.delete('/all',(req,res,next)=>res.end('from delete function'));


app.listen(4000,(req,res,next)=>{console.log(`server is listening on 4000`)});