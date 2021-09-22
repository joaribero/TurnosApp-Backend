const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    date: {type:Date, default: Date.now}
});

const User = mongoose.model("user",userSchema)

module.exports = User;