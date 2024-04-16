

const {getAllUserController , getUserProfileData} = require('../controller/userController');
const { auth } = require('../middlewares/authMiddleware');
const Router = require('../utils/method');


function routerFun(req,res){
    const router = new  Router(req, res);

   
    router.get('/profile',auth,getUserProfileData);
    router.get('/all',auth, getAllUserController);
    router.end();

}

module.exports = routerFun