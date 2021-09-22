const passport = require("passport");

const ctrl = {};

ctrl.register = passport.authenticate('local-register', {
    passReqToCallback: true
});

ctrl.login = passport.authenticate('local-login', (err,user,info) => {
    if (err) throw err;
    if (!user) res.send(info)
    else {
        req.logIn(user,err => {
            if (err) throw err;
            res.send("Succesfully Authenticated");
            //console.log(req.user);
        })
    }
});


module.exports = ctrl;