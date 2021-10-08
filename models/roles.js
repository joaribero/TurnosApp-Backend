const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    Id: {type: Number},
    Name: {type: String},
    createdAt: {type: Date, default: Date.now},
    Description: {type: String},
});

const Roles = mongoose.model("Roles",roleSchema);

module.exports = Roles;