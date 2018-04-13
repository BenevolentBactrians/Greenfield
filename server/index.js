const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(morgan('dev')); // HTTP request logger middleware for node.js

app.use(express.static('../client/dist'));

app.get('/', (req, res) => {
  res.redirect(301, '/login');
})

app.get('/login', (req, res) => {
  console.log('here')
  res.sendFile(path.join(__dirname, '..', '/client/dist/login.html'));
})

app.post('/login', urlencodedParser, (req, res) => {
  console.log(req.body);
  res.sendStatus(201)
})

app.get('/signup', (req, res) => {
  console.log('here')
  res.sendFile(path.join(__dirname, '..', '/client/dist/signup.html'));
})


// -- added to test DB --

app.post('/saveUser', urlencodedParser, (req, res) => {
  console.log(req.body);
  db.saveUser(req.body);
  res.sendStatus(201);
})

app.post('/saveTask', urlencodedParser, (req, res) => {
  console.log(req.body);
  db.saveTask(req.body);
  res.sendStatus(201);
})

app.post('/saveNote', urlencodedParser, (req, res) => {
  console.log(req.body);
  db.saveNote(req.body);
  res.sendStatus(201);
})

// get all users
app.get('/users', urlencodedParser, (req, res) => {
  db.getAllUsers( (users) => {
    res.send(users);
  })
})

// get user by id
app.get('/users/:id', urlencodedParser, (req, res) => {
  db.getUser(req.params, (user) => {
    res.send(user);
  })
})


app.listen(process.env.PORT || 3000, () => console.log('listening on 3000')); // TODO update this console log