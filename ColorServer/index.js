const express = require('express');
const mongoose = require('mongoose');
const models = require('./db_models');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

const HTTPS_PORT = 2020;

mongoose.connect('mongodb://localhost:50000/Colors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', async(req, res) => {
    console.log('o')
})

app.post('/users', (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    console.log(req.body)

    console.log('user added: ' + name + ' ' + password)

    const data = new models.mongoModel({
        username: name,
        password: password,
    })

    data.save();

    res.send({ "status": "ok" }).status(200)

})

app.get('/users', async(req, res) => {

    console.log('get all')
    const users = await models.mongoModel.find({})
    console.log(users)

    if (users == {}) {
        res.send({ "status": "failure" }).status(404)
    } else {

        res.send({ "status": "ok" }).status(200)
    }

})

app.get('/users/:name', async(req, res) => {

    const name = req.params.name
    const password = req.query.password
    console.log('finding user', name)
    console.log('password given', password)

    const user = await models.mongoModel.find({ username: name, password: password })
    console.log(user)
    console.log(user.length)

    if (user.length == 0) {
        res.send({ "status": "failure" }).status(404);
        return
    } else {
        res.send({ "status": "ok" }).status(200);
        return
    }

})

app.post('/users')

// app.patch('/users/:name', async(req, res) => {
// 
//     const name = req.params.name;
// 
//     const data = await models.mongoModel.findOneAndUpdate({ username: name }, { colors: 'NaICHO' }, { new: true })
// 
//     res.send(data).status(200)
// 
// })

app.listen(HTTPS_PORT, (req, res, err) => {
    if (err)
        console.error(err);
    else
        console.log('listening on port ' + HTTPS_PORT)

})