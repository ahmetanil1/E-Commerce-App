const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UserSchema');

dotenv.config();
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = User.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    } else {
        const newUser = new User({
            googleId: profile.id,
            name: profile.name,
            email: profile.emails[0].value
        });
        await newUser.save();
    }
    done(null, profile);
}));
