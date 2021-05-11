const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.param('id', todoController.checkId); For middleware function 

//Auth
router.route('/signup')
    .post(authController.signup);

router.route('/')
.get(userController.getAllUsers)
.post(userController.addUser) // userController.checkData

router.route('/:id')
.get(userController.getUserbyId).
patch(userController.updataUser)
.delete(userController.deleteUser);


module.exports = router;