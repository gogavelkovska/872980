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

Repository.prototype.modify = function (token,packet) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/user/me",
            type: "PUT",
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
            data:JSON.stringify(packet),
        }).done(function () {
            resolve("Succesfully Changed Credentials");
        }).error(function (err) {
           var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Couldn't Modify User Details";    
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;
