const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const  validate  = require('../middleware/validation');

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)

router.get('/current',validate,userController.currUser)
module.exports=router;