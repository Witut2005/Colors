const express = require('express');
const mongoose = require('mongoose');
const models = require('./db_models');

const app = express();
app.use(express.json())

const HTTPS_PORT = 2020;

mongoose.connect('mongodb://localhost:50000/Colors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', async(req, res) => {
    console.log('o')
})

app.post('/users/', (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const colors = req.body.colors;

    const data = new models.mongoModel({
        username: name,
        password: password,
        colors: colors
    })

    data.save();

    res.send('ok').status(200)

})

app.get('/users', async(req, res) => {

    console.log('get all')
    const users = await models.mongoModel.find({})
    console.log(users)

    res.send(users).status(200);

})

app.get('/users/:name', async(req, res) => {

    const name = req.params.name;
    console.log('finding user', req.query.name)

    const user = await models.mongoModel.find({ username: name })
    console.log(user)

    res.send(user).status(200);

})

app.patch('/users/:name', async(req, res) => {

    console.log('PATCHing...')
    const name = req.params.name;

    const data = await models.mongoModel.findOneAndUpdate({ username: name }, { colors: 'NaICHO' }, { new: true })

    res.send(data).status(200)

})

app.listen(HTTPS_PORT, (req, res, err) => {
    if (err)
        console.error(err);
    else
        console.log('listening on port ' + HTTPS_PORT)

})