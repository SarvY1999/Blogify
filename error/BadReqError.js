class BadRequestError extends Error {
    constructor(message, errorcode) {
        super(message)
        this.statusCode = errorcode;
    }
}

module.exports = BadRequestError;