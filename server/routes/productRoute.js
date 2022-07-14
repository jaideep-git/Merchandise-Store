const express = require("express");
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductDetails, productReview, getProductReviews, deleteReview } = require('../controllers/product');
const { isUserAuthenticated, isAdmin } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetails).put(isUserAuthenticated, productReview);
router.route("/product/:id/reviews").get(isUserAuthenticated, getProductReviews);
router.route("/product/:id/review").delete(isUserAuthenticated, deleteReview);


// Product Routes --Admin
router.route("/product/new").post(isUserAuthenticated, isAdmin, createProduct);
router
    .route("/admin/product/:id")
    .put(isUserAuthenticated, isAdmin, updateProduct)
    .delete(isUserAuthenticated, isAdmin, deleteProduct)
    .get(getProductDetails);




module.exports = router;

