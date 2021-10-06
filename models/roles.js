const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    roleId: {type: Number},
    roleName: {type: String},
    createdAt: {type: Date, default: Date.now},
    roleDescription: {type: String},
});

const Roles = mongoose.model("Roles",roleSchema);

module.exports = Roles;