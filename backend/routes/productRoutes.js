const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");

const { getProducts, createProduct, deleteProduct, upgradeProduct } = require("../controllers/ProductController");

router.get("/products", getProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct); // silme işlemini yalnızca yöneticilerin yapabileceğini söyler  
router.put("/products/:id", upgradeProduct);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "User is authenticated", user: req.user })
})


module.exports = router;
