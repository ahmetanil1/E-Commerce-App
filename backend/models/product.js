const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: [
        {
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            }
        }
    ],
});

const product = mongoose.model('Product', productSchema);

module.exports = product;