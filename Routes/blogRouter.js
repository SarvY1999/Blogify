const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllposts,
    getSinglePost,
    updatePost,
    deletePost,
    getPostbyCategory
} = require('../Controllers/blogController');


router.route('/createBlog').post(createPost);
router.route('/getAllposts').get(getAllposts);
router.route('/:postId').get(getSinglePost);
router.route('/:postId').put(updatePost);
router.route('/:postId').delete(deletePost);
router.route('/category/:category').get(getPostbyCategory);


module.exports = router;