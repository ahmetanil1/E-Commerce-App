const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
dotenv.config();
connectToDb();


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.use(express.json());
app.use("/", userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(`MongoDB listening on ${PORT} `);
})
