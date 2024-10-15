const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true, min: 0.01
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    images: String,
    timestamps: true,
    inStock: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("products", productSchema);