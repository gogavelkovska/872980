/*jslint node: true */
"use strict";

var express = require('express'),
    adder = require('./adder');

exports.createRouter = function () {
    var router = express.Router();

    router.use('/add', adder.createRouter());

    return router;
};
