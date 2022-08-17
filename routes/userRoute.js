const router = require('express').Router()
const { registerUser } = require('../controllers/userController')
const gravatar = require('gravatar');
const { User } = require('../models/user');
const crypto = require("crypto");

function generateAvatarUrl(emailAddress, options = {}) {
    const defaultImage = options.defaultImage || "identicon";
    const emailHash = crypto
        .createHash("md5")
        .update(emailAddress)
        .digest("hex");
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}`;
}
/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Login Page', message:
            req.flash('loginMessage')
    });
}); 
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

module.exports = router;

//  <strong>Name</strong>: <%= user.local.name %><br>
