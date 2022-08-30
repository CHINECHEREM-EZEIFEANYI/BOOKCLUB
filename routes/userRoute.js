const router = require('express').Router()
const { registerUser } = require('../controllers/userController')
const gravatar = require('gravatar');
const { User } = require('../models/user');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var randtoken = require('rand-token');
const bcrypt = require('bcrypt')

function generateAvatarUrl(emailAddress, options = {}) {
    const defaultImage = options.defaultImage || "monsterid";
    const emailHash = crypto
        .createHash("md5")
        .update(emailAddress)
        .digest("hex");
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}`;
    
}
//send email
function sendEmail(email, token) {

    var email = email;
    var token = token;

    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chydigigirls@gmail.com', 
            pass: '12345' 
        }
    });

    var mailOptions = {
        from: 'chydigigirls@gmail.com',
        to: email,
        subject: 'Reset Password Link - Bookclub.com',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/newpassword?token=' + token + '">link</a> to reset your password</p>'

    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email Not Sent!!!')
        } else {
            console.log("Email Successfully Sent")
        }
    });
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
/* UPDATE Password to database */
router.post('/updatepassword', function (req, res, next) {

    var token = req.body.token;
    var password = req.body.password;

    connection.query('SELECT * FROM users WHERE token ="' + token + '"', function (err, result) {
        if (err) throw err;

        var type
        var msg

        if (result.length > 0) {

            var saltRounds = 10;

            // var hash = bcrypt.hash(password, saltRounds);

            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {

                    var data = {
                        password: hash
                    }

                    connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function (err, result) {
                        if (err) throw err

                    });

                });
            });

            type = 'success';
            msg = 'Your password has been updated successfully';

        } else {

            console.log('2');
            type = 'success';
            msg = 'Invalid link; please try again';

        }

        req.flash(type, msg);
        res.redirect('/');
    });
})

module.exports = router;


