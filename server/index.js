const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('../client/dist'))

app.get('/', (req, res) => {
  res.redirect(301, '/login')
})

app.get('/login', (req, res) => {
  console.log('here')
  res.sendFile(path.join(__dirname, '..', '/client/dist/login.html'));
})

app.post('/login', urlencodedParser, (req, res) => {
  console.log(req.body)
  res.sendStatus(201)
})

app.get('/signup', (req, res) => {
  console.log('here')
  res.sendFile(path.join(__dirname, '..', '/client/dist/signup.html'));
})


app.listen(process.env.PORT || 3000, () => console.log('listening on 3000'))