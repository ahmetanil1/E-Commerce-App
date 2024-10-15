const Product = require("../models/productSchema");
const User = require("../models/userSchema");


const getProducts = async (req, res) => {

    try {
        const products = await Product.find();
        res.status(201).json(products);

    } catch (error) {
        console.log('message :>> ', error.message);
        return res.json({ message: "Products did not find" });
    }
}

const createProduct = async (req, res) => {
    const { title, price, description, category, inStock } = req.body;

    if (!title || !price || !description || !category || !images || !inStock) {
        return res.json({ message: "Have to fill all gaps for product" })
    }
    // if (!req.user || !req.user.isAdmin) {
    //     return res.json({ message: "Just admin can create a new product " })
    //     // req.user BİLGİSİ İÇİN ÖNCE MİDDLWARE İÇERİİSNDE ADMİN İŞLEMKERİ YAPILMALI 
    // }
    try {
        const existingProduct = await Product.findOne({ title });
        if (existingProduct) {
            return res.json({ message: "This product already exist" })
        }
        const newProduct = new Product({
            title: title,
            price: price,
            description: description,
            category: category,
            images: images,
            inStock: inStock
        })

        await newProduct.save();
        res.status(201).json(newProduct);
        console.log('newProduct :>> ', newProduct);

    } catch (error) {
        res.json({ message: "Did not create new product" });
        console.log('error :>> ', error.message);
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if (!req.user || !req.user.isAdmin) {
        return res.json({ message: "Just admin can delete products " })
        // req.user BİLGİSİ İÇİN ÖNCE MİDDLWARE İÇERİİSNDE ADMİN İŞLEMKERİ YAPILMALI 
    }
    try {
        deletedProduct = await Product.findByIdAndDelete(id);
        if (deleteProduct) return res.json({ message: "did not find product which is you want to delete" })
        res.status(201).json({ message: "product deleted" })
    }
    catch (error) {
        res.json({ message: "did not delete product" });
        console.log('error :>> ', error.message);
    }

}

const upgradeProduct = async (req, res) => {
    const id = req.params.id;
    if (!req.user || req.user.isAdmin) {
        console.log("Just admin can update products ");
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.json({ message: "did not find product which is you want to update" });
        }
        res.status(201).json({ message: "product updated" });
        console.log('updateProduct :>> ', updateProduct);
    }
    catch (error) {
        console.log('error :>> ', error.message);
        return res.json({ message: "Did not upgrade product" })
    }
}


module.exports = { getProducts, createProduct, deleteProduct, upgradeProduct };