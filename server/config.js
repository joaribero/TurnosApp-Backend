const express = require('express');
const cors = require ('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('../models/user');
const routes = require('../routes/index');

module.exports = app => {

    //Settings
    app.set('port', process.env.PORT || 4000);

    //middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(
        cors({
            origin: [
                "http://localhost:3000"
            ],
            credentials: true
        })
    );

    app.use(session({
        secret: "mostvaluatesecret",
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser("mostvaluatesecret"));
    app.use(passport.initialize());
    app.use(passport.session());
    require('../passportConfig')(passport);

    routes(app);

    return app;
}