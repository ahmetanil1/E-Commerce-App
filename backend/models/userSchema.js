const mongoose = require("mongoose");

const userSchema = new mongoose.schema({
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
    timestamps: true, // OTOMATİK OLARAK CREATEAT VE UPGRADETAT EKLER,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("users", userSchema)