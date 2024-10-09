const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    images: {
        type: mongoose.model.Types.ObjectId,
        ref: "products",
        required: true

    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('carts', cartSchema);
