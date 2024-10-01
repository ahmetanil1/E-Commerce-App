const express = require("express")
const router = express.Router()
const { createUser, getUsers, deleteUser, updateUser } = require("../controllers/userController");


// get all users
router.get("/", getUsers);
// create a new user
router.post("/register", createUser);
// delete a user
router.delete("/:id", deleteUser);
// update a user
router.put("/:id", updateUser);

app.use("/users", router);


module.exports = router;