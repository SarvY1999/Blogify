const express = require('express');
const router = express.Router();
const {authenticateUser, authorizeUser} = require('../Middleware/auth');
const {
    createPost,
    getAllposts,
    getSinglePost,
    updatePost,
    deletePost,
    getPostbyCategory
} = require('../Controllers/blogController');


router.route('/createBlog').post(authenticateUser, createPost);
router.route('/getAllposts').get(authenticateUser, getAllposts);
router.route('/:postId').get(authenticateUser, getSinglePost);
router.route('/:postId').put(authenticateUser, updatePost);
router.route('/:postId').delete(authenticateUser, deletePost);
router.route('/category/:category').get(authenticateUser, getPostbyCategory);


module.exports = router;