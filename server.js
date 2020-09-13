const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const dbPostgres = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '123456789qa',
        database : 'smartbrain'
    }
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', signin.handleSignin(dbPostgres, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, dbPostgres, bcrypt)}); 
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, dbPostgres)});
app.put('/image', (req, res) => {image.handleImage(req, res, dbPostgres)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})