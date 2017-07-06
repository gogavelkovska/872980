/*jslint node:true, nomen: true */
"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = "awt.ifmledit.org";
}

Repository.prototype.register = function (packet) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/user",
            type: "POST",
            contentType: "application/json",
             headers: {
            "Authorization": "APIKey 3d71167c-f9d8-451c-9873-b7168f568303"
            },
            data:JSON.stringify(packet),
        }).done(function () {
            resolve("Registered");
        }).error(function (err) {
            /*var error = new Error(errorThrown);
            error.responseText =  $.parseJSON(jqXHR.responseText);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.errors;*/
            var error=new Error(err);
            error.textStatus=err.responseJSON.error;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;
