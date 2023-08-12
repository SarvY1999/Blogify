const User = require('../Model/user');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../error/BadReqError');

const getAllUser = async (req, res) => {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(StatusCodes.OK).json({ users, UserCount: users.length });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId}).select('-password');

    if (!user) {
        throw new BadRequestError(`No user found with id : ${req.params.userId}`, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({ user });;
};

const updateUser = async (req, res) => {
    const { name, email} = req.body;

    if(!name || !email){
        throw new BadRequestError('Empty Fields are not allowed', StatusCodes.BAD_REQUEST)
    }

    const user = await User.findOneAndUpdate({_id : req.user.userId}, req.body, { new: true, runValidators: true }).select("-password");
    
    if(!user){
        throw new BadRequestError(`No user found with id : ${req.user.userId}`, StatusCodes.NOT_FOUND);
    }
    
    res.status(StatusCodes.OK).json({user});
};

const UpdateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new BadRequestError("Please Provide old password and new password", StatusCodes.BAD_REQUEST);
    };

    const user = await User.findOne({_id : req.user.userId}); // req.user.userId is coming from authenticateUser middleware

    if(!user){ 
        throw new BadRequestError(`No user found with id : ${req.user.userId}`, StatusCodes.NOT_FOUND);
    };

    const isMatch = await user.comparePassword(oldPassword);
    if(!isMatch){
        throw new BadRequestError(`Invalid Credentials`, StatusCodes.UNAUTHORIZED);
    };

    user.password = newPassword; 
    await user.save(); // using .save() so that the password will be hashed.

    res.status(StatusCodes.OK).json({msg: "Password Successfully changed"});
};

const deleteUser = async (req, res) => {

    const user = await User.findOneAndDelete({_id: req.user.userId});

    if(!user){
        throw new BadRequestError(`No user found with id : ${req.user.userId}`, StatusCodes.NOT_FOUND);
    };

    res.status(StatusCodes.OK).json({msg: "Account Deleted Successfully!!!!"});

};

module.exports = { getAllUser, getSingleUser, updateUser, UpdateUserPassword, deleteUser };