const User = require('../Model/user');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../error/BadReqError');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log({ name, email, password });
    const ifUserExist = await User.findOne({ email });

    if (!ifUserExist) {
        throw new BadRequestError("User already Exist", StatusCodes.BAD_REQUEST)
    }
    const user = await User.create({ name, email, password });
    console.log(user);
    res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
    res.send('Login user cont')
};

const logout = async (req, res) => {
    res.send('logout user cont')
};

module.exports = {
    register,
    login,
    logout
}