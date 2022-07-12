const Product = require('../models/product');
const ErrorHandler = require("../utils/errorHandler");
const catchAsynError = require("../middleware/catchAsyncErrors");

// * Get all products
exports.getProducts = catchAsynError(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
});

// * Get Product Details
exports.getProductDetails = catchAsynError(async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(201).json({
        success: true,
        product
    })
});

// * Create Product -- Admin
exports.createProduct = catchAsynError(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// * Update Product --Admin
exports.updateProduct = catchAsynError(async (req, res,next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false})

    res.status(201).json({
        success: true,
        product
    })
})

// * Delete Product --Admin
exports.deleteProduct = catchAsynError(async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    await product.remove();

    res.status(201).json({
        success: true,
        message: "Product removed successfully"
    })
});
