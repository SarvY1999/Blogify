const BadRequestError = require('../error/BadReqError');

const customErrorHandler = (err, req, res, next) => {
    if(err instanceof BadRequestError){
        return res.status(err.statusCode).json({msg : err.message});
    }
    return res.status(500).json({msg: "Something went wrong please try again later"})
}

module.exports = customErrorHandler;