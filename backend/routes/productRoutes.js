const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin.js")


const { getProducts, createProduct, deleteProduct, upgradeProduct } = require("../controllers/ProductController");

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", isAdmin, deleteProduct); // silme işlemini yalnızca yöneticilerin yapabileceğini söyler  
router.put("/:id", upgradeProduct);


module.exports = router;
