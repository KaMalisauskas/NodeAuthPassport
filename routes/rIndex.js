var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var connect = require('./../models/connection');
var registrationSchema = require('./../models/mRegistration');
var passport = require('passport');
var registrationSchema = require('./../models/mRegistration');

//requesting controllers
var indexController = require('./../controllers/cIndex');

var router = express.Router();

//routing

//get
router.get('/', indexController.index);
router.get('/login', indexController.login);

//auth needed pages
router.get('/main',authenticationMiddleware(), indexController.main);
router.get('/main/profile',authenticationMiddleware(), indexController.profile);
router.get('/logout', indexController.logout);

//post
router.post('/register', indexController.registration);
router.post('/login', indexController.auth);

passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});

function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        var User = mongoose.model('Users', registrationSchema);

        User.find({_id:req.session.passport.user.user_id}, function(err, user) {
            if(err) throw err;
            req.session.username = user;
            if (req.isAuthenticated()) return next();
            res.redirect('/login')

        })



    }
}


module.exports = router;