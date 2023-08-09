const BadRequestError = require('../error/BadReqError');
const {StatusCodes } = require('http-status-codes')

const customErrorHandler = (err, req, res, next) => {
    
    if(err instanceof BadRequestError){
        return res.status(err.statusCode).json({msg : err.message});
    }

    if(err.name == "ValidationError"){
        const validatorError = Object.values(err.errors).map((item) => (item.message)).join(' , ');
        return res.status(StatusCodes.BAD_REQUEST).json({msg: validatorError});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went erong, Please try again"});
}

module.exports = customErrorHandler;