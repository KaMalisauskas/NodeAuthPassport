var express = require('express');
var mongoose = require('mongoose');
var connect = require('./../models/connection');

var Schema = mongoose.Schema;

var Session = mongoose.model('Session', new Schema({
    sid: String,
    data: String,
    lastActivity: {
        type: Date,
        expires: 900 // removed automatically after 15 minutes of no activity <3 mongo.
    }
}));

module.exports = Session;