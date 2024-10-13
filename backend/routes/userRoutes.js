const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser, updateUser, loginUser } = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddlewares");


router.get("/", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post('login', loginUser);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "User is authenticated", user: req.user })
})

module.exports = router;