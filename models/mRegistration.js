var express = require('express');
var mongoose = require('mongoose');
var connect = require('./../models/connection');

var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var registrationSchema = new Schema ({
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: String,
    updated: { type: Date, default: Date.now }
});

registrationSchema.plugin(uniqueValidator);

module.exports = registrationSchema;