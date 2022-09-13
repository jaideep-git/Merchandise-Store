const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsynError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// * Register User
exports.registerUser = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (!user) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  sendToken(user, 201, res);
});

// * Login User
exports.loginUser = catchAsynError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// * Get User Detail
exports.getUserDetails = catchAsynError(async (req, res, next) => {
  const id = req.userId;
  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("Login Required", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// * Logout User
exports.logout = catchAsynError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfuly",
  });
});

// * Forget Password
exports.forgotPassword = catchAsynError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Invalid Email", 404));
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `Password reset link - ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "PASSWORD RESET",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// * Reset Password
exports.resetPassword = catchAsynError(async (req, res, next) => {
  // Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Link is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Resetting password and JWT token
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// * Update User Profile
exports.updateProfile = catchAsynError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

// * Update User Password
exports.updatePassword = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated Successfully",
  });
});

// ***** ADMIN CONTROL ***** //

// * Get all user --Admin
exports.getUsers = catchAsynError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// * Get user detail --Admin
exports.getUserDetailAdmin = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// * Update user role and role --Admin
exports.updateRoleAndProfile = catchAsynError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

// * Delete User --Admin
exports.deleteUser = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
