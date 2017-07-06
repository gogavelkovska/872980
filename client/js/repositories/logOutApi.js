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

Repository.prototype.logOut = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/auth",
            type: "DELETE",
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
           
        }).done(function () {
            resolve("Logged Out");
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
