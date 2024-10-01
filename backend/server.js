const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
dotenv.config();
connectToDB();

const app = express();


app.use(cors({ origin: '*' })); // GELİŞTİRME ORTAMINDA BU ŞEKİLDE

// GERÇEK PORJEDE BU ŞEKİLDE OLMALI
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: false => ÇEREZ YÖNETİMİ
// }));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} üzerinde çalışıyor`);
})
