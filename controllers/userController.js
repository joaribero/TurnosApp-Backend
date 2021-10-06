const { createCollection } = require('../models/roles');
const Roles = require('../models/roles');
const User = require('../models/user');

const ctrl = {};

ctrl.createRole = (req, res) => {

}

ctrl.users = async (req, res) => {
    const users = await User.find();

    res.send(users);
};

module.exports = ctrl;