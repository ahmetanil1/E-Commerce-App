const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");



const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true // Çerezlerin ve kimlik doğrulama bilgilerin paylaşılmasına izin ver
}));

mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB'ye başarıyla bağlandı"))
    .catch((error) => console.error("MongoDB bağlantı hatası:", error));

// body-parser yerine express.json() kullanılıyor
app.use(express.json());

// Routerlar için base path ekledik
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
