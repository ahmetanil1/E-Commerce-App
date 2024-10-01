const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const cors = require("cors");
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} üzerinde çalışıyor`);
})
