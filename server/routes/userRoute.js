const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getUsers, getUserDetailAdmin, updateRoleAndProfile, deleteUser } = require("../controllers/user");
const { isUserAuthenticated, isAdmin } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isUserAuthenticated, updatePassword);

router.route("/user").get(isUserAuthenticated, getUserDetails);

router.route("/user/profile").put(isUserAuthenticated, updateProfile)

router.route("/logout").get(logout);

// * Admin Routes
router.route("/admin/users").get(getUsers);
router.route("/admin/user/:id")
    .get(isUserAuthenticated, isAdmin, getUserDetailAdmin)
    .put(isUserAuthenticated, isAdmin, updateRoleAndProfile)
    .delete(isUserAuthenticated, isAdmin, deleteUser);



module.exports = router;