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


    if (user.length == 0) {
        res.send({ "status": "failure" }).status(404);
        return
    } else {
        res.send({ "status": "ok" }).status(200);
        return
    }

})

app.get('/users/colors/:name', async(req, res) => {

    const name = req.params.name

    const user = await models.mongoModel.findOne({ username: name })

    const colors = user.colors == undefined ? '' : user.colors
    console.log(user)
    console.log('user colors:', colors)

    if (user.length == 0) {
        res.send({ "status": "failure" }).status(404);
        return
    } else {
        res.send({ "status": "ok", "data": user.jobs }).status(200);
        return
    }

})

app.post('/users/colors', async(req, res) => {

    console.log('body', req.body)

    const username = req.body.username
    const password = req.body.password
    const color = req.body.job.color
    const duration = req.body.job.duration
    const date = req.body.job.date
    const tag = req.body.job.tag

    console.log('color post')

    user = await models.mongoModel.findOne({ username: username, password: password })
    user = await models.mongoModel.findOneAndUpdate({ username: username, password: password }, { date: new Date(), jobs: { colors: user.jobs.colors + color + '\n', duration: user.jobs.duration + duration + '\n', date: user.jobs.date + date + '\n', tag: user.jobs.tag + tag + '\n' } })

    if (user.length == 0) {
        res.send({ "status": "failure" }).status(404);
        return
    } else {
        res.send({ "status": "ok" }).status(200);
        return
    }

})


app.post('/users', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body)

    // console.log(findOne({ username: req.body.name }))

    if (models.mongoModel.findOne({ username: req.body.username }) != null) {
        res.send({ "status": "failure", "error": "account with this name already exists!" }).status(403)
    }

    const data = new models.mongoModel({
        username: username,
        password: password,
        jobs: {
            colors: '',
            date: '',
            duration: '',
            tag: ''
        }
    })

    data.save();

    res.send({ "status": "ok" }).status(200)

})

app.listen(HTTPS_PORT, (req, res, err) => {
    if (err)
        console.error(err);
    else
        console.log('listening on port ' + HTTPS_PORT)

})