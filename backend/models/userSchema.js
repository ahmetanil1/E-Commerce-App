const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // Düzeltme yapıldı
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true // Ensures all emails are lowercase
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("users", userSchema);
