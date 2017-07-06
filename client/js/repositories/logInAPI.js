/*jslint node:true, nomen: true */
"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = "http://awt.ifmledit.org";
}

Repository.prototype.logIn = function (packet) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/auth",
            type: "POST",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIKey 3d71167c-f9d8-451c-9873-b7168f568303"
            },
            data:JSON.stringify(packet),
        }).done(function (result) {
            resolve(result.token);
        }).error(function (err) {
             var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Something Went Wrong in the request";    
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;
