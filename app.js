var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var registrationSchema = require('./models/mRegistration');



//auth
var session = require('express-session');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var connect = require('./models/connection');
var bcryp = require('bcrypt');
var flash = require('connect-flash');

var index = require('./routes/rIndex');

//require('dotenv').config();

//using npms
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressValidator());

//seting up views directory and engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'asdasfsdaf',
    resave: false,
    saveUninitialized: true
}))
//auth

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//login auth
passport.use(new LocalStrategy(
    //username and password are from forms
    function(username, password, done) {

        var User = mongoose.model('Users', registrationSchema);
        //finding if username exist
        User.find({Username: username})

            .catch(function(err) {
                throw(err);
            })
            .then(function(user) {

                //checking if array in not empty
                if(user.length > 0) {

                    const hash = user[0].Password;
                    //comapring hashed password with inputed one
                    bcryp.compare(password, hash, function(err, response) {
                        //if auth is true
                        if(response) {
                            return done(null, {user_id: user[0]._id});

                        } else {

                            return done(null, false, {message: "password doesnt match"});
                        }
                    });

                } else {

                    return done(null, false, {message: "invalid username"});

                }
            });



    }
));

//url
app.use('/', index);

//seting port
var port = process.env.PORT || 8882;

app.listen(port, function() {
    console.log("Ready on port " + port);
})