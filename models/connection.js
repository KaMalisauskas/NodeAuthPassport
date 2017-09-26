const express = require('express');
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://karkia:karookia@ds143744.mlab.com:43744/learningnode', {
    useMongoClient: true,

});

module.exports = connect;