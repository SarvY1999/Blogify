const express = require('express');
const router = express.Router();
const {getAllUser, getSingleUser, updateUser, UpdateUserPassword, deleteUser} = require('../Controllers/userController');


router.route('/getAllusers').get(getAllUser);
router.route('/getSingleuser/:userId').get(getSingleUser);
router.route('/updateUser/:userId').patch(updateUser);
router.route('/updatePassword/:userId').patch(UpdateUserPassword);
router.route('/deleteUser/:userId').delete(deleteUser);


module.exports = router;