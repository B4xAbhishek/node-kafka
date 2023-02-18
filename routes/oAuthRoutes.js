const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// const keys = require('./config/keys');
const router = express.Router();
const User = require('../models/userModel');

passport.use(
    new GoogleStrategy({
        clientID: "571674706506-2mueis8gifnpdmeu2fvkodn7ltjure6g.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
    })
);


router.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys');
    }
);


module.exports = router

