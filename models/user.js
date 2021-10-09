const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    roleId: {type: Number},
    password: {type: String},
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    date: {type:Date, default: Date.now},
    facebookId: {type: String},
    googleId: {type: String},
    profilePicture: {type: String, default: '/images/profile.svg'},
    socials: {
        instagram: {type: String},
        facebook: {type: String},
        twitter: {type: String},
        web: {type: String}
    },
    phones: {
        areaCode: {type: Number},
        number: {type: Number}
    },
    state: {type: Number}
});

const User = mongoose.model("user",userSchema)

module.exports = User;