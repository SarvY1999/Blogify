const User = require('../Model/user');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../error/BadReqError');
const {createCookieAndAttachtoUser} = require('../utils/createToken');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const ifUserExist = await User.findOne({ email });

    if (ifUserExist) {
        throw new BadRequestError("User Already Exists", StatusCodes.BAD_REQUEST)
    }
    const user = await User.create({ name, email, password });
    const userObj = {name: user.name, email: user.email, userId: user._id, role: user.role}
    createCookieAndAttachtoUser(res, userObj);
    res.status(StatusCodes.CREATED).json({ user : userObj});
};

const login = async (req, res) => {
    const {email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError("Please provide Email and Password", StatusCodes.NOT_ACCEPTABLE)
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError("User does not exist", StatusCodes.NOT_FOUND);
    };

    const flag = await user.comparePassword(password);
    
    if(!flag){
        throw new BadRequestError("Credentials invalid", StatusCodes.UNAUTHORIZED);
    }

    const userObj = {name: user.name, email: user.email, userId: user._id, role: user.role}
    createCookieAndAttachtoUser(res, userObj);

    res.status(StatusCodes.OK).json({msg : "User logged in Successfull"});
};

const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({msg: "User logged out successfully"});
};

module.exports = {
    register,
    login,
    logout
}