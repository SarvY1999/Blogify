const User = require('../Model/user');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../error/BadReqError');

const getAllUser = async (req, res) => {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(StatusCodes.OK).json({ users, UserCount: users.length });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId});

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

    const user = await User.findOneAndUpdate({_id : req.params.userId, role: "user"}, req.body, { new: true, runValidators: true }).select("-password");
    
    if(!user){
        throw new BadRequestError(`No user found with id : ${req.params.userId}`, StatusCodes.NOT_FOUND);
    }
    
    res.status(StatusCodes.OK).json({user});
};

const UpdateUserPassword = async (req, res) => {
    res.send('Update User password');
};

const deleteUser = async (req, res) => {
    res.send('Delete User');
};

module.exports = { getAllUser, getSingleUser, updateUser, UpdateUserPassword, deleteUser };