const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser, updateUser } = require("../controllers/UserController");

router.get("/", getUsers);
router.post("/register", createUser);
router.delete("/:id", isAdmin, deleteUser);
router.put("/:id", updateUser);


module.exports = router;