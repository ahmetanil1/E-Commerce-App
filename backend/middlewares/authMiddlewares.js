const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // TOKEN TÜRÜ İÇİN HEADERSDAN BİLGİ GELMESİ LAZIM.
        // YUKARDAKİ İŞLEM İLE DE HEADERDA AUTHORİZATİON KISMINDA SONRAKİ 1 BOŞLUKTAN SONRAKİNİ AL GETİR
        // BURAYA SPESİFİK BİR HEADER DA EKLEYEBİLİRİZ.

        const verifiedToken = jwt.verify(token, JWT_SECRET_KEY);
        const userID = verifiedToken.id;

        if (req.body.userID !== userID) {
            console.log("Invalid User ID");
            return res.status(res.statusCode).json({ message: "Forbidden" })
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode).json({ message: "Invalid request" })
    }
}


module.exports = authMiddleware