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

Repository.prototype.getWorkers = function (token,worker) {
    
        
    
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+worker,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
            resolve(result.workers);
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
Repository.prototype.selection = function (token,worker,type) {
    var self = this;
    var method="POST";
    if(type)
        method="DELETE";
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+worker,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
             $.ajax({
            url: "http://awt.ifmledit.org"+result.selection,
            type: method,
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function () {
            resolve("Done");
        });
          
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
Repository.prototype.annotation = function (token,worker,type) {
    var self = this;
    var method="POST";
    if(type)
        method="DELETE";
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+worker,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
             $.ajax({
            url: "http://awt.ifmledit.org"+result.annotation,
            type: method,
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function () {
            resolve("Done");
        });
          
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
Repository.prototype.getDetails = function (token,worker) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+worker,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
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
Repository.prototype.publish = function (token,execution) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+execution,
            type: "POST",
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function () {
           self.currentCampaign.status="started";
           resolve("published");
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
Repository.prototype.terminate = function (token,execution) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+execution,
            type: "DELETE",
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function () {
           self.currentCampaign.status="ended";
           resolve("published");
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
