const mongoose = require('mongoose');

const userStateSchema = mongoose.Schema({
    Id: {type: Number},
    Name: {type: String},
    createdAt: {type: Date, default: Date.now},
    Description: {type: String},
});

const State = mongoose.model("State",roleSchema);

module.exports = State;