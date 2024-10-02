const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const passport = require("passport");
const session = require("express-session");
require("./config/passport-setup")
dotenv.config();
connectToDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// const SESSION_SECRET = process.env.SESSION_SECRET

app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Google ile kaydolma yönlendirmesi
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


// Google callback yönlendirmesi
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/register', // Başarısız olursa buraya yönlendir
    successRedirect: 'http://localhost:5173/',
}), (req, res) => {
    try {
        res.redirect('http://localhost:5173/');
    } catch (error) {
        console.log(error);
    }
});

app.get('/auth/user', (req, res) => {
    res.send(req.user);
});

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} üzerinde çalışıyor`);
})
