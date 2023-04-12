const mongoose = require('mongoose');



const schema = {
    username: String,
    password: String,
    jobs: {
        date: String,
        colors: String,
        duration: String,
        tag: String
    }
}

const mongoModel = mongoose.model('colorDb', schema)

const idSchema = {
    currentId: Number
}


module.exports = { mongoModel }