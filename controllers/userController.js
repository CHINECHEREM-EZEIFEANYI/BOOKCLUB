const { User } = require('../models/user');
const passport = require("passport");
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
var randtoken = require('rand-token');
const initialize = require('../passportConfig')

exports.registerUser = async (req, res, next) => {
    const { first_name, last_name, email, password, passwordConfirm, } = req.body;
    console.log({ first_name, last_name, email, password, passwordConfirm });

    let errs = []

    if (!first_name || !last_name || !email || !password || !passwordConfirm) {
        errs.push({ message: "please enter all fields" })
    }
    if (password.length < 6) {
        errs.push({ message: "password should be atleast 6 characters" })
    }
    if (password != passwordConfirm) {
        errs.push({ message: "passwords do not match" })
    }
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        errs.push({ message: "This email is already registered" })
    }
    if (errs.length > 0) {
        res.render('register', { errs })
    }
    else {
        try {
            const user = await User.create({
                first_name,
                last_name,
                email,
                password,
                passwordConfirm,
            })
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(user.password, salt,
                    (err, hash) => {
                        if (err) throw err;
                        user.password = hash;

                    }));
            console.log(user)
            await user.save(user, (err, user) => {
                if (err) {
                    res.send(err)
                    console.log(err)
                }
                else {
                    req.flash("success_msg", "you are now registered, Please login");
                    res.redirect("/login");
                    console.log('success')
                    console.log(user)
                }
            })

        } catch (err) {
            next(err)
        }
    }
}
//create autocomplete
// function autocompleteMatch(input) {
//     if (input == '') {
//         return [];
//     }
//     var reg = new RegExp(input)
//     return search_terms.filter(function (term) {
//         if (term.match(reg)) {
//             return term;
//         }
//     });
// }
// function showResults(val) {
//     res = document.getElementById("result");
//     res.innerHTML = '';
//     if (val == '') {
//         return;
//     }
//     let list = '';
//     fetch('/suggest?q=' + val).then(
//         function (response) {
//             return response.json();
//         }).then(function (data) {
//             for (i = 0; i < data.length; i++) {
//                 list += '<li>' + data[i] + '</li>';
//             }
//             res.innerHTML = '<ul>' + list + '</ul>';
//             return true;
//         }).catch(function (err) {
//             console.warn('Something went wrong.', err);
//             return false;
//         });
// }

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
exports.logoutUser = function (req, res) {
    req.logout();
    res.redirect("/");
}

exports.loginUser = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/logout',
        failureFlash: true
    }, initialize)
}
	
/* send reset password link in email */
exports.passwordreset = ( function(req, res, next) {
 
    var email = req.body.email;
 
    //console.log(sendEmail(email, fullUrl));
 
    connection.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
        if (err) throw err;
         
        var type = ''
        var msg = ''
   
        console.log(result[0]);
     
        if (result[0].email.length > 0) {
 
           var token = randtoken.generate(20);
 
           var sent = sendEmail(email, token);
 
             if (sent != '0') {
 
                var data = {
                    token: token
                }
 
                connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
                    if(err) throw err
         
                })
 
                type = 'success';
                msg = 'The reset password link has been sent to your email address';
                 console.log(res.headersSent)
                 return res.render("homepage")
             }
            
             else {
                type = 'error';
                 msg = 'Ooopssssie. Please try again';
                 res.render("forgotpassword");
            }

 
        } else {
            console.log('The Email is not registered with us');
            type = 'error';
            msg = 'The Email is not registered with us';
            res.render("forgotpassword");
            console.log(res.headersSent)
        }
    
        req.flash(type, msg);
        res.redirect('/');
    });
})