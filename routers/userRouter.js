

const {getAllUserController , getUserProfileData} = require('../controller/userController');
const { auth } = require('../middlewares/authMiddleware');
const Router = require('../utils/method');
function test(req, res) {
    console.log('test',req.params);
    return res.end('from test function');
}

function routerFun(req,res){
    const router = new  Router(req, res);

    router.put('/post/am/:ParamId/test',(req,res,next)=>{console.log('test from middle');next()},(req,res,next)=>{console.log('test from middle2');next()},test);
    router.get('/profile',auth,getUserProfileData);
    router.get('/am/:ParamId/test',test);
    router.get('/all',auth, getAllUserController);
    router.delete('/all',(req,res,next)=>res.end('from delete function'));
    router.end();

}

module.exports = routerFun