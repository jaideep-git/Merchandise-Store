const express = require("express");
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/product');

router.route("/products").get(getProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);


module.exports = router

