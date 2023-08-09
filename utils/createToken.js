const jwt = require('jsonwebtoken');

const genToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}

const isTokenValid = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const createCookieAndAttachtoUser = (res, user) => {
    const token = genToken(user);
    return res.cookie('token', token,
        {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 86,400,000 Miliseconds in one day
            secure: process.env.NODE_ENV === "production",
            signed: true
        })
}

module.exports = { genToken, isTokenValid, createCookieAndAttachtoUser };