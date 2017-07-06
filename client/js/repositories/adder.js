/*jslint node:true, nomen: true */
"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.add = function (a, b) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/add',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                a: a,
                b: b
            })
        }).done(function (result) {
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.errors;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;
