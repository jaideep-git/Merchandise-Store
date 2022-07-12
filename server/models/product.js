const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name required"]
    },
    desc: {
        type: String,
        required: [true, "Product description required"]
    },
    price: {
        type: Number,
        required: [true, "Product description required"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    stock: {
        type: Number,
        required: [true, "Product stock required"],
        maxLength: [4, "Stock cannot exceed 4 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    merchandise: {
        type: String,
        required: [true, 'Please Enter product category']
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            Comment: {
                type: String,
                required: true
            }
        }
    ],
    totalReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Product', productSchema);