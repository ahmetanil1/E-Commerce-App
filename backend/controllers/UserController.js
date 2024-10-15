const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
    const { name, email, password, admin } = req.body;

    if (!name || !email || !password) {
        return res.json({ message: "Have to fill all gaps to register" });
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
            admin: admin
        });
        await newUser.save();
        res.status(201).json({ message: "created a new user" && newUser });
        console.log('newUser :>> ', newUser);
    } catch (error) {
        res.status(res.statusCode).json({ message: "Did not create new user" })
        console.log('error :>> ', error);
        return;
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Have to fill all gaps to login" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" })
        }
        const isMatchPassword = await bcrypt.compare(password, existingUser.password)
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Did not match passwords" })
        }

        const payload = { id: existingUser._id, name: existingUser.name, admin: existingUser.admin, email: existingUser.email, password: existingUser.password }
        const isAdmin = await User.findOne({ isAdmin: true })
        if (isAdmin) {
            const adminToken = jwt.sign(payload, { role: 'admin' }, JWT_SECRET_KEY, { algorithm: 'RS256' }, () => {
                console.log('adminToken:>> ', adminToken);
            })
        }
        else {
            const userToken = jwt.sign(payload, { role: 'user' }, JWT_SECRET_KEY, { algorithm: 'RS256' }, () => {
                console.log('userToken:>> ', userToken);
            })
        }
    } catch (error) {
        console.log('error :>> ', error.message);
        return res.json({ message: "Did not log in user" })
    }
}



const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) console.log('Did not find user who is you want to delete ');
        else console.log('deletedUser :>> ', deletedUser);
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
            return res.status(404).json({ message: "Did not find user who is you want to update" });
        }
        else {
            console.log('updatedUser :>> ', updatedUser);
        }
        res.status(200).json({ message: "updated User" });
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı güncellenemedi" });
    }
}

module.exports = { getUsers, createUser, deleteUser, updateUser, loginUser }   
