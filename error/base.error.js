class BaseError extends Error {
    constructor(name , httpStatusCode , description , isOperational){
        super(description);
        Object.setPrototypeOf(this , new.target.prototype)
        this.name = name;
        this.httpStatusCode = httpStatusCode;
        this.description = description;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError