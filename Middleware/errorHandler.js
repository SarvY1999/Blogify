const BadRequestError = require('../error/BadReqError');
const {StatusCodes } = require('http-status-codes')

const customErrorHandler = (err, req, res, next) => {
    // let errObj = {
    //     errcode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    //     message : err.message || "Something went wrong, Please try again"
    // }
    
    if(err instanceof BadRequestError){
        return res.status(err.statusCode).json({msg : err.message});
    }

    if(err.name == "ValidationError"){
        const validatorError = Object.values(err.errors).map((item) => (item.message)).join(' , ');
        return res.status(StatusCodes.BAD_REQUEST).json({msg: validatorError});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, Please try again"});
    // return res.status(errObj.errcode).json({msg: errObj.message});
}

module.exports = customErrorHandler;