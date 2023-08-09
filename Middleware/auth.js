const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../error/BadReqError")
const { isTokenValid } = require('../utils/createToken');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new BadRequestError("Authentication Invalid", StatusCodes.FORBIDDEN);
    }

    try {
        const payload = isTokenValid(token);
        req.user = payload  // attaching the payload to user so it will be available for next functions
        next();
    } catch (error) {
        throw new BadRequestError("Authentication Invalid", StatusCodes.FORBIDDEN);
    }

}

const authorizeUser = (req, res, next) => {
    if (req.user.role !== "admin") {
        throw new BadRequestError("Unathorized", StatusCodes.FORBIDDEN);
    }
    next();
}

module.exports = { authenticateUser, authorizeUser };