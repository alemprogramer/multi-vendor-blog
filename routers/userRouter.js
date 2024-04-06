

const {getAllUserController} = require('../controller/userController');

function router(req,res){
    console.log('start');
    if(req.method === 'GET'){
        res.end('from get method')
    }else if(req.method === 'POST'){
        res.end('from post method')
    }

}

module.exports = router