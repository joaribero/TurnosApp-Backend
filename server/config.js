const express = require('express');
const cors = require ('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('../routes/index');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

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
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: process.env.DB_URI
        })
    }));
    app.use(cookieParser("mostvaluatesecret"));
    app.use(passport.initialize());
    app.use(passport.session());
    require('../passportConfig')(passport);

    routes(app);

    return app;
}