const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const auth = require('../controllers/authController');
const user = require('../controllers/userController');

module.exports = app => {

    // ----------------USER ----------------------------------
    router.post('/addSocials', auth.setSocials);
    router.post('/setContactData', auth.setContactData);
    router.get('/users', user.users);

    // ----------------AUTH ----------------------------------
    router.post('/login', auth.login);
    router.post('/register',auth.register);
    router.get('/auth/facebook',auth.loginFacebook);
    router.get('/user',auth.getUser);
    router.get('/logout',auth.logout);
    //router.get('/auth/facebook/callback',auth.facebookCallback);
    router.get('/auth/google',auth.loginGoogle);
    //router.get('/auth/google/callback',auth.googleCallback);


    //TODO: Revisar porque si pasamos al controller esta lógica no encuentra las rutas
    
    router.get('/auth/facebook/callback', passport.authenticate('facebook', null), function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/");
    });

    router.get('/auth/google/callback', passport.authenticate('google', null), function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/");
    });

    app.use(router);
}

