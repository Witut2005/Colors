const mongoose = require('mongoose');

const schema = {
    id: Number,
    username: String,
    password: String,
    colors: String
}

const mongoModel = mongoose.model('colorDb', schema)

const idSchema = {
    currentId: Number
}


module.exports = { mongoModel }