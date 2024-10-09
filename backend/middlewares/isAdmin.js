// ÖRNEK KOD
// const isAdmin = (req, res, next) => {
//     // Kullanıcı bilgileri authentication sonrası req.user içinde olmalı
//     if (req.user && req.user.isAdmin) {
//         return next(); // Sonraki middleware veya route handler'a geç
//     }
//     res.status(403).json({ message: "Erişim reddedildi. Yalnızca yöneticiler." });
// };

// module.exports = isAdmin;
