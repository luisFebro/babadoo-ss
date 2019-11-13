const express = require("express");
const router = express.Router();
const cors = require("cors");
const keys = require("../config");
const passport = require("passport");
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

router.use(cors());
router.use(passport.initialize());

// GOOGLE REQUEST
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect("/cliente");
    });
// END GOOGLE REQUEST

// FACEBOOK REQUEST
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/cliente");
    });
// END FACEBOOK REQUEST

// INSTAGRAM REQUEST
router.get("/auth/instagram", passport.authenticate("instagram"));
router.get("/auth/instagram/callback",
    passport.authenticate("instagram"),
    (req, res) => {
        res.redirect("/cliente");
    });
// END INSTAGRAM REQUEST

router.get("/user", (req, res) => {
    console.log("getting user data!");
    res.send(user);
});

router.get("auth/logout", (req, res) => {
    console.log("logging out!");
    user = {};
    res.redirect("/");
});
