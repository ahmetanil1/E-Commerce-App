const express = require("express");
const { getProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const router = express.Router();


// get all products
router.get("/", getProducts);
// create a new product
router.post("/", createProduct);
// delete a product
router.delete("/:id", deleteProduct);
// update a product
router.put("/:id", updateProduct);


module.exports = router;