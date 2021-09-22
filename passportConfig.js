const User = require('./models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = async (passport) => {

    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        // busco el user por username
        const user = await User.findOne({username: username});
        if (!user){
            //El username no existe
            return done(null, false,"El usuario no existe")      
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            //El username existe, pero la contraseña es incorrecta.
            return done(null, false, "La contraseña es incorrecta")
        }
        //Username y contraseña coinciden.
        done(null, user);
    } ),(err, user, info) => {
        if (info) {
            res.send({msg: info});
        }
    });

    passport.use('local-register',new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },async (req, username, password, done) => {
        
        //Busco y verifico que no exista el username.
        const user = await User.findOne({username: username});
        if (user){
            //El username existe, envío mensaje de error
            return done(null, false, 'Este nombre de usuario ya existe');
        }
        else {
            //Username no existe, sigo con el proceso de creación.
            const newUser = new User();
            newUser.username = username;
            newUser.password = await bcrypt.hash(password, 10);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            await newUser.save();
            done(null, newUser);
        }
    
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            const userInformation = {
                username: user.username
            };
            cb(err,userInformation);
        })
    })


}
