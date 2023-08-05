class BadRequestError extends Error {
    constructor(message, errorcode) {
        super(message);
        this.errorcode = errorcode;
    }
}

module.exports = BadRequestError;