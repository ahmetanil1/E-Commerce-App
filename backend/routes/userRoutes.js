const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

// Kullanıcı oluşturma
router.post("/api/users", async (req, res) => {
    try {
        // Kullanıcı input doğrulaması (örnek)
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email ve şifre gereklidir" });
        }

        // E-posta kontrolü
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "E-posta zaten kullanılıyor." });
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu", user });
    }
    catch (err) {
        console.log("Kullanıcı oluşturulurken hata oluştu:", err);
        res.status(500).json({ message: "Kullanıcı oluşturulamadı: " + err.message });
    }
});

// Tüm kullanıcıları getirme
router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        console.log("Kullanıcılar getirilirken hata oluştu:", err);
        res.status(500).json({ message: "Kullanıcılar getirilirken bir hata oluştu." });
    }
});

// Kullanıcı güncelleme
router.put("/api/users/:id", async (req, res) => {
    try {
        const userID = req.params.id;

        // Güncelleme işlemi
        const user = await User.findByIdAndUpdate(userID, req.body, { new: true });
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

        res.json({ message: "Kullanıcı başarıyla güncellendi", user });
    } catch (err) {
        console.log("Kullanıcı güncellenirken hata oluştu:", err);
        res.status(500).json({ message: "Kullanıcı güncellenemedi: " + err.message });
    }
});

// Kullanıcı silme
router.delete("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

        res.json({ message: "Kullanıcı başarıyla silindi" });
    } catch (err) {
        console.log("Kullanıcı silinirken hata oluştu:", err);
        res.status(500).json({ message: "Kullanıcı silinemedi: " + err.message });
    }
});

module.exports = router;
