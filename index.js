const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const connection = require('./database')
const passport = require('passport');
const session = require('express-session')
const router = require('./routes/userRoute')
const bookRoute = require('./routes/bookRoute')
const flash = require('connect-flash')
const gravatar = require('gravatar');

const initializePassport = require("./passportConfig");
initializePassport(passport);

//view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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
app.use(flash())
app.use(express.json());
app.use(router);
app.use(bookRoute)
app.use('/signup', router)



app.listen(3000, () => (
    console.log('Up and running')
))