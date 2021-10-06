const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    roleId: {type: Number, required},
    roleName: {type: String, required},
    createdAt: {type: Date, default: Date.now},
    roleDescription: {type: String},
});

const Roles = mongoose.model("Roles",roleSchema);

module.exports = Roles;