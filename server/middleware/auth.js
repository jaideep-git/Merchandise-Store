const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Login Required", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decodeData.id;
    req.user = await User.findById(decodeData.id);
    
    next();
})

exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce`, 403));
    }
    
    next();
});

  
 