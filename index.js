const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const connection = require('./database')
const passport = require('passport');
const session = require('express-session')
const router = require('./routes/userRoute')
const initializePassport = require("./passportConfig");
initializePassport(passport);

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }));

connection()
app.use(passport.initialize());
app.use(passport.session());
app.use(router);



app.listen(3000, () => (
    console.log('Up and running')
))