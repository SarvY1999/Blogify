const Post = require('../Model/blog');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require("../error/BadReqError")

const createPost = async (req, res) => {

    const post = await Post.create(req.body);
   res.status(StatusCodes.CREATED).json({blog: post});

};

const getAllposts = async (req, res) => {
    const posts = await Post.find({});

    res.status(StatusCodes.OK).json({posts, postsFound: posts.length});
};

const getSinglePost = async (req, res) => {
    const {postId} = req.params // using postId becuase in the route is defined as router.route('/:postId').get(getSinglePost);
    const post = await Post.findOne({_id: postId}); // can also use findById(postId)
    
    if(!post){
        throw new BadRequestError(`No post exist with id: ${postId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({post});
};

const updatePost = async (req, res) => {
    const {postId} = req.params;
    const {title, content}  = req.body;

    if(!title || !content){
        throw new BadRequestError('Empty title or content is not allowed', StatusCodes.BAD_REQUEST);
    }

    const post = await Post.findOneAndUpdate({_id: postId}, req.body, { new: true, runValidators: true });

    if(!post){
        throw new BadRequestError(`No post exist with id: ${postId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({post});
};

const deletePost = async (req, res) => {
    const {postId} = req.params;

    const post = await Post.findOneAndDelete({_id: postId});

    if(!post){
        throw new BadRequestError(`No post exist with id: ${postId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({msg: "Post deleted Successfully"});
};

const getPostbyCategory = async (req, res) => {
    res.send("get Post by Category Controller");
};


module.exports = {
    createPost,
    getAllposts,
    getSinglePost,
    updatePost,
    deletePost,
    getPostbyCategory
}