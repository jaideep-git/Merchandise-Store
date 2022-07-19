const Product = require('../models/product');
const ErrorHandler = require("../utils/errorHandler");
const catchAsynError = require("../middleware/catchAsyncErrors");
const Features = require('../utils/features');

// * Get all products
exports.getProducts = catchAsynError(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments()

    const apiFeature = new Features(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount
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

// * Create or Update the Review
exports.productReview = catchAsynError(async (req, res, next) => {
    const { rating, comment} = req.body; 
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    
    const product = await Product.findById(req.params.id);
    
    // Check if user has already reviewed the product
    const isReviewed = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    );

    // update old review or create new review
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.totalReviews = product.reviews.length;
    }

    // Average rating of the product
    const sumOfReviewRatings = product.reviews.reduce((a, b) => a + b.rating, 0)
    product.rating = sumOfReviewRatings / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    
    res.status(201).json({
        success: true,
    })
});

// * Get all reviews
exports.getProductReviews = catchAsynError(async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(201).json({
        success: true,
        reviews:product.reviews
    })
});

// * Delete Review
exports.deleteReview = catchAsynError(async (req, res,next) => {
    let product = await Product.findById(req.params.id);

    let reviews = [];
    let totalRating = 0;
    
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    const foundReview = product.reviews.find(
        review => review._id.toString() === req.query.review_id.toString()
    )

    const isAuthor = foundReview.user.toString() == req.user._id.toString()
    const isAdmin = req.user.role == "admin"
    
    // Delete only if user is Author or Admin
    if ( isAuthor || isAdmin ) {
       reviews = product.reviews.filter(
            (rev) => rev._id.toString() !== req.query.review_id.toString()
        );
    };

    if (!isAuthor && !isAdmin) {
        return next(new ErrorHandler("Unauthoried", 401))
    }
    
    reviews.forEach((rev) => {
        // Average rating of the product
        totalRating += rev.rating
    })

    totalReviews = reviews.length;
    const rating = totalRating / product.reviews.length;

    await Product.findByIdAndUpdate(req.params.id,{reviews,totalReviews,rating})

    res.status(201).json({
        success: true,
        message:"Reviewed Deleted Successfully"
    })
});

// ***** ADMIN CONTROL ***** //

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
