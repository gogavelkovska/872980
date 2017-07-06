/*jslint node: true */
"use strict";

var express = require('express'),
    parser = require('body-parser');

exports.createRouter = function () {
    var router = express.Router();

    router.post('/', parser.json(), function (req, res) {
        if (typeof req.body.a === 'number' && !isNaN(req.body.a) &&
                typeof req.body.b === 'number' && !isNaN(req.body.b)) {
            console.log('Adding ' + req.body.a + '+' + req.body.b);
            res.json({
                result: req.body.a + req.body.b
            });
        } else {
            var errors = {};
            if (typeof req.body.a !== 'number' || isNaN(req.body.a)) {
                errors.a = 'Invalid Value';
            }
            if (typeof req.body.b !== 'number' || isNaN(req.body.b)) {
                errors.b = 'Invalid Value';
            }
            res.status(400).json({
                errors: errors
            });
        }
    });

    return router;
};
