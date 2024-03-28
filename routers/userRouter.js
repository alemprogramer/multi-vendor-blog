const router = require("express").Router();


const {getAllUserController} = require('../controller/userController');

router.get('/',getAllUserController);

module.exports = router