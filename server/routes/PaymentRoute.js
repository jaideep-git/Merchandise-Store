const express = require("express");
const { processPayment, stripeApiKey } = require("../controllers/payment");
const router = express.Router();
const { isUserAuthenticated } = require("../middleware/auth");

router.route("/payment/process").post(isUserAuthenticated, processPayment);
router.route("/api/key").get(isUserAuthenticated, stripeApiKey);
module.exports = router;
