const User = require("../models/userSchema");
const bcrypt = require("bcrypt");


const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ message: user });
    } catch (error) {
        console.error(error.message);
        res.json({ message: "User did not find" });
    }
}

const createUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
        return res.json({ message: "Have to fill all gaps" });
    }
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: "This user already exist" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: passwordHash,
            isAdmin: isAdmin
        });
        await newUser.save();
        res.status(201).json({ message: "created a new user" });
        console.log('newUser :>> ', newUser);
    } catch (error) {
        res.json({ message: "Did not create new user" })
        console.log('error :>> ', error.message);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) return res.json({ message: "did not find user who is you want to delete" })
        res.status(201).json({ message: "user deleted" })
    }
    catch (error) {
        res.json({ message: "did not delete user" })
        console.log('error :>> ', error.message);
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Güncellenmek istenen kullanıcı bulunamadı" });
        }
        res.status(200).json({ message: "updated User" });
        console.log('updateUser :>> ', updateUser);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı güncellenemedi" });
    }
}

module.exports = { getUsers, createUser, deleteUser, updateUser }   
