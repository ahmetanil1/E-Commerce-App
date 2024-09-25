const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(deletedProduct);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;