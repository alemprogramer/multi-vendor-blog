const Router = require('../utils/method');

const {userRegisterController,userLoginController,refreshTokenController} = require('../controller/authController');

const routerFun = (req,res)=>{
    const router = new Router(req,res);

    router.post('/register', userRegisterController);
    router.post('/login', userLoginController);
    router.post('/refreshToken', refreshTokenController);
    router.end();

}

module.exports = routerFun;