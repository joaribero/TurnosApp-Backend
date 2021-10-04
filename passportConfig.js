require('dotenv').config();
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
            newUser.phones.number = req.body.number;
            await newUser.save();
            done(null, newUser);
        }
    
    }));

    passport.use('facebook',new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_KEY,
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName', 'profileUrl'],
        },
        async (accessToken, refreshToken, profile, cb) => {

            const user = await User.findOne({ facebookId: profile.id });
            if (user) {
                return cb(null, user);
            } else {
                let newUser = new User();
                newUser.facebookId = profile.id;
                newUser.email = profile.emails[0].value;
                newUser.lastName = profile.name.familyName;
                newUser.firstName = profile.name.givenName;
                newUser.username = newUser.firstName + newUser.lastName;

                await newUser.save();
                return cb(null,newUser);
            }
        }
    ));

    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {

        const user = await User.findOne({googleId: profile.id});
        if (user) {
            user.profilePicture = profile._json.picture;
            await user.save();
            return cb(null, user);
        } else {
            let newUser = new User();
            newUser.googleId = profile.id;
            newUser.email = profile.emails[0].value;
            newUser.lastName = profile.name.familyName;
            newUser.firstName = profile.name.givenName;
            newUser.username = newUser.firstName + newUser.lastName;
            newUser.profilePicture = profile.photos[0].value;

            await newUser.save();
            return cb(null,newUser);
        }
      }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            const userInformation = {
                id: id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                facebookId: user.facebookId,
                googleId: user.googleId,
                picture: user.profilePicture,
                socials: user.socials
            };
            cb(err,userInformation);
        })
    })


}
