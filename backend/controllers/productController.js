const Product = require("../models/ProductSchema");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json({ message: "ürünler getirilemedi" });
    }
}

const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(409).json({ message: "Ürün Oluşturulamadı" });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProduct = await Product.findById(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Silinmek istenen ürün bulunamadı" });
        }
        await deletedProduct.remove();
        res.status(200).json({ message: "Urun Silindi" });

    }
    catch (error) {
        res.status(500).json({ message: "Urun Silinemedi" });
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Güncellenmek istenen ürün bulunamadı" })
        }
        await product.updateOne({ $set: req.body });// Güncellenen her bir veriyi değiştirir.
        const updatedProduct = await Product.save();
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Urun Güncellenemedi" });
    }
}
module.exports = { getProducts, createProduct, deleteProduct, updateProduct }