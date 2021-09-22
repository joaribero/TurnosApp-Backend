const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const auth = require('../controllers/authController');

module.exports = app => {

    router.post('/register', (req,res,next) => {
        passport.authenticate('local-register', (err, user, info) => {
            if (err) throw err;
            if (info) return res.status(200).send({error: info});

            if (user) {
                req.logIn(user, err => {
                    if (err) throw err;
                    return res.send("User created")
                })              
            }
        })(req, res, next);
    });
    
    router.post('/login', (req,res,next) => {
        
        passport.authenticate('local-login', (err,user,info) => {
            if (err) throw err;
            if (!user) res.status(200).send({error: info})
            else {
                req.logIn(user,err => {
                    if (err) throw err;
                    res.send("Succesfully Authenticated");
                    //console.log(req.user);
                })
            }
        })(req, res, next);
    });
    
    router.get('/user', (req,res) => {
        res.send(req.user);
    });

    router.get('/logout', 
        async (req, res,next) => {
            await req.logout();
            res.send('Success');
        }
    );

    app.use(router);
}

