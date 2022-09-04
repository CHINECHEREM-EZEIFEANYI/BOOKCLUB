const router = require('express').Router()
const { registerUser } = require('../controllers/userController')
const { loginUser } = require('../controllers/userController')
const { passwordreset } = require('../controllers/userController')
const gravatar = require('gravatar');
const { User } = require('../models/user');
const crypto = require("crypto");

function generateAvatarUrl(emailAddress, options = {}) {
    const defaultImage = options.defaultImage || "monsterid";
    const emailHash = crypto
        .createHash("md5")
        .update(emailAddress)
        .digest("hex");
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}`;
    
}

/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Login Page',
        message: req.flash('loginMessage')
    });
}); 
router.post('/login', loginUser)
/* GET Signup */
router.get('/signup', function (req, res) {
    res.render('signup', {
        title: 'Signup Page',
        message: req.flash('signupMessage')
    });
}); 
router.post('/signup', registerUser)
/* GET Profile page. */
router.get('/profile', function (req, res, next) {
    res.render('profile', {
        title: 'Profile Page', user: User,
        avatar: generateAvatarUrl('perpetualezeifeanyi@gmail.com', {
            s: '100', r: 'x', d:
                'retro'
        }, true)
    });
}); 
/* UPDATE Password to database */  
router.post("/updatepassword", passwordreset)

const data = ["apple","apple watch","iphone","iphone x","apple macbook","apple macbook air","apple macbook air pro 13"];

// router.get('/suggest', function (req, res, next) {
//     console.log(req.query)
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(data.filter(value => value.includes(req.query.q))));
// });

router.get('/select', function (req, res) {
    res.render('select', {
        title: 'Books Available',
        message: req.flash('Books Available')
    });
}); 



function checkAuthenticated(req, res, next) {
    if (req.user) {
        next();
    }

    else {
        req.flash('success_msg', 'You need to be authenticated to access this page');
        res.redirect("/login");

    }
}

module.exports = router;


