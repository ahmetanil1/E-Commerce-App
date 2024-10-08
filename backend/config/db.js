const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
        const conn = mongoose.connect(MONGO_URI);
        console.log((await conn).connection.port);
    }
    catch (error) {
        console.log(`MongoDB connection error : ${error.message}`);
    }
}

module.exports = connectToDb