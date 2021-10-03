const passport = require("passport");
const User = require("../models/user");

const ctrl = {};

// REGISTRARSE LOCAL
ctrl.register = (req,res,next) => {
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
};

// LOCAL LOGIN
ctrl.login = (req,res,next) => {
        
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
}

// FACEBOOK LOGIN
ctrl.loginFacebook = passport.authenticate('facebook', {scope: ['email','public_profile']});

//FACEBOOK LOGIN CALLBACK
ctrl.facebookCallback = passport.authenticate('facebook', null), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
};

// GOOGLE LOGIN
ctrl.loginGoogle = passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] });

//GOOGLE LOGIN CALLBACK
ctrl.googleCallback = passport.authenticate('google', null), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
};

// SET SOCIAL MEDIA INFO ON THE USER.
ctrl.setSocials = async (req, res) => {
    const user = await User.findOne({_id: req.user._id});
    if (!user) {
        res.send({error: "Error de autenticación."})
    } else {
        user.socials.instagram = req.body.instagram;
        user.socials.facebook = req.body.facebook;
        user.socials.twitter = req.body.twitter;
        user.socials.web = req.body.web;

        await user.save();

        res.send({msg: "Success"});
    }
};

//GET LOGGED USER
ctrl.getUser = (req,res) => {
    res.send(req.user);
};

//DESLOGUEAR USUARIO.
ctrl.logout = async (req, res) => {
    await req.logout();
    res.send('Success');
};


module.exports = ctrl;