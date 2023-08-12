const express = require('express');
const router = express.Router();
const {getAllUser, getSingleUser, updateUser, UpdateUserPassword, deleteUser} = require('../Controllers/userController');
const {authenticateUser, authorizeUser} = require('../Middleware/auth');


router.route('/getAllusers').get(authenticateUser, authorizeUser, getAllUser);
router.route('/getSingleuser/:userId').get(authenticateUser, getSingleUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, UpdateUserPassword);
router.route('/deleteUser').delete(authenticateUser,deleteUser);


module.exports = router;