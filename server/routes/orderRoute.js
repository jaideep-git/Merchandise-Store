const express = require("express");
const router = express.Router();
const { isUserAuthenticated, isAdmin } = require("../middleware/auth");
const { newOrder, getOrderDetails, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/order");

router.route("/order/new").post(isUserAuthenticated, newOrder);

router.route("/order/:id")
    .get(isUserAuthenticated, getOrderDetails)
    .put(isUserAuthenticated, isAdmin, updateOrderStatus)
    .delete(isUserAuthenticated, isAdmin, deleteOrder)

router.route("/myorders").get(isUserAuthenticated, myOrders);
router.route("/orders").get(isUserAuthenticated, isAdmin, getAllOrders);
router.route("/order/new").post(isUserAuthenticated, newOrder);


module.exports = router;
