// routes/user.js
const express = require("express");
const router = express.Router();
const { createUser, getUsers, deleteUser, updateUser } = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
