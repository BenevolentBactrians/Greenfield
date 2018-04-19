const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database');
var bcrypt = require('bcrypt');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(morgan('dev')); // HTTP request logger middleware for node.js

app.set('view engine', 'ejs'); // sets a view engine to use things from /views folder

app.use(express.static(path.join(__dirname, '..', '/client/dist')));

app.get('/', (req, res) => {
  res.render('index');
})
<<<<<<< HEAD

// app.get('/', (req, res) => {
//   res.redirect(301, '/login');
// })
=======
>>>>>>> b117b77... refactored to use express views

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', urlencodedParser, (req, res) => {
  console.log(req.body);
  db.getUser({name: req.body.email}, (error, result) => {
    result === null || result.length === 0 ? res.status(404).send(`Invalid credentials`) : 
      bcrypt.hash(req.body.password, result.salt, function(err, hash) {
        hash !== result.hashedPassword ? res.status(404).send(`Invalid credentials`)  :
<<<<<<< HEAD
<<<<<<< HEAD
          res.render('index')
=======
          res.sendFile(path.join(__dirname, '..', '/client/dist/index.html'));
>>>>>>> 8d6dc5a... working login
=======
          res.render('index')
>>>>>>> b117b77... refactored to use express views
      });
  })
})

app.get('/signup', (req, res) => {
  res.render('signup')
})


// -- added to test DB --

// { email: 'test@aere',
//   password: 'test',
//   'password-again': 'test' }

app.post('/signup', urlencodedParser, (req, res) => {
  console.log(req.body);
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        let formated = {}
        formated.name = req.body.email;
        formated.salt = salt
        formated.hashedPassword = hash
        db.saveUser(formated, (error, success) => {
          error ? res.status(400).send(`Sorry ${error}`) : res.sendStatus(201);
        });
    });
  });
  
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