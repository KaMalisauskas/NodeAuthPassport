var express = require('express');
var mongoose = require('mongoose');

var connect = mongoose.connect('mongodb://karkia:karookia@ds143744.mlab.com:43744/learningnode', {
    useMongoClient: true,

});

module.exports = connect;