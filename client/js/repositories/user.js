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

Repository.prototype.userDetails = function (token) {
    var self = this;
    
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/user/me",
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
           
        }).done(function (result) {
            self.user=result;
            resolve(result);
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
