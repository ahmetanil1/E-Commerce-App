const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");

const app = express();
dotenv.config();
connectToDb();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(`MongoDB listening on ${PORT} `);
})