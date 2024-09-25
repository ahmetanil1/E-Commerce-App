const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/user');
const Product = require('./models/product');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');



const uri = "mongodb://localhost:27017/e-commerce";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB bağlantısı başarılı!');
}).catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
});

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('Mongo ile baglantı kuruldu');
});
