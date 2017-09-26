var express = require('express');
var connect = require('./../models/connection');
var mongoose = require('mongoose');
var registrationSchema = require('./../models/mRegistration');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var passport = require('passport');

//hashing
var bcrypt = require('bcrypt');
const saltRounds = 10;

var router = express.Router();

exports.index = function(req, res) {
    var sessData = req.session;
    res.render('index', {title: 'Register', success: sessData.success, errors: sessData.errors, err: sessData.err} );
    req.session.destroy();
};

exports.login = function(req, res) {
    var sessData = req.session;
    res.render('login', {title: 'Login', success: sessData.success, errors: sessData.errors, message: req.flash('error')} );
    req.session.destroy();
}


exports.registration = function(req, res) {

    var User = mongoose.model('Users', registrationSchema);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const rePassword = req.body.rePassword;



    //validation
    req.checkBody('username', 'Required username').notEmpty();
    req.checkBody('email', 'Required  email').notEmpty();
    req.checkBody('email', 'Not an email').isEmail();
    req.checkBody('password', 'Required  password').notEmpty();
    req.checkBody('rePassword', 'Required match').notEmpty();
    req.checkBody('rePassword', 'Password does not match').equals(password);

    //escaping string
    req.sanitizeBody('username').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();

    var errors = req.validationErrors();

        if (!errors) {

            bcrypt.hash(password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                var newUser = new User({
                    Username: username,
                    Email: email,
                    Password: hash,
                });


                newUser.save(function(err) {
                    if(err) {
                       throw err;
                    } else {
                        console.log("Person saved");

                        const userId = newUser.id;

                        req.login(newUser.id, function(err) {
                           res.redirect('/main');
                        })


                    }
                });

            });

        } else {

            var sessData = req.session;

            sessData.errors = errors;

            sessData.success = false;

            res.redirect('/');
        }



};


exports.auth = passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
});

exports.main = function(req, res) {

    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('main', {title: 'main', username: req.session.username});

}

exports.logout = function(req, res) {
    req.logOut();
    req.session.destroy();
    res.redirect('/')
}

exports.profile = function(req, res) {
    res.render('profile', {title:'Profile'});
}