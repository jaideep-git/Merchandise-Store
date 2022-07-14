const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MongoDB error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // MongoDB duplicate key error
    if (err.code === 11000) {
        const message = `Email already exist`;
        err = new ErrorHandler(message,400)
    }

    //Invalid JWT
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token is Invalid. Please Try again.'
        err = new ErrorHandler(message, 400);
    }

    // Expired JWT 
    if (err.name === 'JsonWebTokenError') {
        const message = 'Web Token is expired. Please Try again.'
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.statusCode,
        message: err.message
    })
}