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
        id: Number,
        name: String,
        image: String
    },
    images: String,
    timestamps: true,
    inStock: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("products", productSchema);