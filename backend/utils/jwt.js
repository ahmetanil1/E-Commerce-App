const jwt = require("jsonwebtoken");

// generate a token => oluşturma
const geretateToken = (userId) => {

    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// verify a token => doğrulama 
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { geretateToken, verifyToken }