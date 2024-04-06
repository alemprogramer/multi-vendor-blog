

const {getAllUserController} = require('../controller/userController');
const Router = require('../utils/method');
function test(req, res) {
    return res.end('from test function');
}

function routerFun(req,res){
    const router = new  Router(req, res);
    router.get('/',(req,res,next)=>{console.log('test from middle');next()},(req,res,next)=>{console.log('test from middle2');next()},test);
    router.get('/all',(req,res,next)=>res.end('from user all function'));
    // router.end();

}

module.exports = routerFun