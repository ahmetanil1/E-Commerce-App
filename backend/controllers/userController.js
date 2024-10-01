const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json({ message: "Kullanıcılar getirilemedi" });
    }
}

const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tüm alanları doldurmalısınız" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Bu kullanıcı zaten var" });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: passwordHash
        })
        await newUser.save();
        res.status(201).json({ newUser });
    }
    catch (error) {
        res.status(409).json({ message: "Kullanıcı oluşturulamadı" });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findById(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "silinmek istenilen kullanıcı bulunamadı" })
        }
        await deletedUser.remove();
        res.status(200).json({ message: "kullanıcı silindi" });
    }
    catch (error) {
        res.status(500).json({ message: "kullanıcı silinemedi" });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Güncellenmek istenen kullanıcı bulunamadı" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı güncellenemedi" });
    }
}


module.exports = { getUsers, createUser, deleteUser, updateUser }   