const express = require("express");
const cors = require("cors");
const passport = require("passport");
const keys = require("../config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
let user = {};

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(JSON.stringify(profile));
        user = { ...profile };
        return cb(null, profile);
    }));
// End Google Strategy

// Facebook Strategy
passport.use(new FacebookStrategy({
        clientID: keys.FACEBOOK.clientID,
        clientSecret: keys.FACEBOOK.clientSecret,
        callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }));
// End Facebook Strategy

// Instagram Strategy
passport.use(new InstagramStrategy({
        clientID: keys.INSTAGRAM.clientID,
        clientSecret: keys.INSTAGRAM.clientSecret,
        callbackURL: "/auth/instagram/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
    }));
// End Instagram Strategy

const app = express();
app.use(cors());
app.use(passport.initialize());

// GOOGLE REQUEST
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect("/profile");
    });
// END GOOGLE REQUEST

// FACEBOOK REQUEST
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/profile");
    });
// END FACEBOOK REQUEST

// INSTAGRAM REQUEST
app.get("/auth/instagram", passport.authenticate("instagram"));
app.get("/auth/instagram/callback",
    passport.authenticate("instagram"),
    (req, res) => {
        res.redirect("/profile");
    });
// END INSTAGRAM REQUEST

app.get("/user", (req, res) => {
    console.log("getting user data!");
    res.send(user);
});

app.get("auth/logout", (req, res) => {
    console.log("logging out!");
    user = {};
    res.redirect("/");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT);