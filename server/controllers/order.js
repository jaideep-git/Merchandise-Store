const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require("../utils/errorHandler");
const catchAsynError = require("../middleware/catchAsyncErrors");

// * Place New Order
exports.newOrder = catchAsynError(async (req, res) => {
    const order = await Order.create({...req.body, user:req.user._id, paidAt: Date.now()})

    res.status(200).json({
        success: true,
        order
    });
}); 

// * Get Order Details
exports.getOrderDetails = catchAsynError(async (req, res,next) => {
    let order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    res.status(201).json({
        success: true,
        order
    })
});

// *  User Orders
exports.myOrders = catchAsynError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
});

// *  All Orders --Admin 
exports.getAllOrders = catchAsynError(async (req, res, next) => {
    const orders = await Order.find();
    let totalBalance = 0;

    orders.forEach((order) => {
        totalBalance += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalBalance,
        orders,
    });
});

// * Update Order Status --Admin
exports.updateOrderStatus = catchAsynError(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    
    if (order.orderStatus === "delivered") {
        return next(new ErrorHandler("Order already delivered", 404))
    }
    
    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    })

    order.orderStatus = req.body.status;

    // Delivery Time
    if (req.body.status === "delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
    })
});

// * Updating product stock after delivery
async function updateStock(productId, quantity) {
    let product = await Product.findById(productId);

    product.stock -= quantity;
    product.save();
}

// * Delete Order --Admin
exports.deleteOrder = catchAsynError(async (req, res,next) => {
    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    await order.remove();

    res.status(201).json({
        success: true,
        message: "Order deleted successfully"
    })
});