const express = require('express')
const app = express()

const accountData1 = require('./data.js')
const accountData2 = require('./data2.js')
app.use(express.static('src'))
var session = require('express-session');
// doc du lieu tu body gui
var bodyParser = require('body-parser') 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// khai bao de app su dung duoc thu muc views
var path = require('path');
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
//khai baoo session
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000*300 }
}))

//
const add = require('./routes/add')
const xacthuc = require('./routes/xacthuc')
const logout = require('./routes/logout')
const dashboard = require('./routes/dashboard')
const trangchu = require('./routes/trangchu')
const login = require('./routes/login')
const register = require('./routes/register')
const find = require('./routes/find')

app.use(xacthuc);
app.use(logout);
app.use(dashboard);
app.use(trangchu);
app.use(login);
app.use(register);
app.use(add);
app.use(find);

app.get('/test', function (req, res) {
  res.sendFile( __dirname + "/src/index.html")
})
app.get('/test', function (req, res) {
  res.sendFile( __dirname + "/src/index2.html")
})
//user
app.get('/vote', function (req, res, next) {
  if(req.session.loggedinUser){
    res.render('vote.ejs')
  }else{
    res.redirect('/xacthuc');
  }
})

//admin
app.get('/AddCandidate', function (req, res, next) {
  if(req.session.loggedinUser){
    res.render('AddCandidate.ejs')
  }else{
    res.redirect('/xacthuc');
  }
})
app.get('/info', function (req, res, next) {
  if(req.session.loggedinUser){
    res.render('info.ejs')
  }else{
    res.redirect('/xacthuc');
  }
})
app.get('/ketqua', function (req, res, next) {
  if(req.session.loggedinUser){
    res.render('ketqua.ejs')
  }else{
    res.redirect('/xacthuc');
  }
  
})
app.get('/layout', function (req, res) {
  res.sendFile( __dirname  + "/src/layout.html" );
})
module.exports = {
  "server": {
    "baseDir": ["./src", "./build/contracts"],
    "routers": {
      "/node_modules": "node_modules"
    },
    middleware: {
      1:app,
    }
  },
}
