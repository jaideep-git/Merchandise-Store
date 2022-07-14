const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Username cannot exceed 30 characters"],
        minLength:[4, "Username should have atleast 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        validate: [validator.isEmail, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Email required"],
        minLength:[8, "Password must be at least 8 characters"],
        select:false
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
});

// * JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

// * Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// * Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding token to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  
    return resetToken;
  };

module.exports = mongoose.model('User', userSchema);