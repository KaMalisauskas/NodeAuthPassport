const express = require('express');
const mongoose = require('mongoose');
const connect = require('./../models/connection');

const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

const registrationSchema = new Schema ({
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: String,
    updated: { type: Date, default: Date.now }
});

registrationSchema.plugin(uniqueValidator);

module.exports = registrationSchema;