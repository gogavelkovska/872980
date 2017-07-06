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

Repository.prototype.getTasks = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/task",
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
            resolve(result.tasks);
        }).error(function (err) {
             var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Cannot load Tasks";    
            reject(error);
        });
    });
};
Repository.prototype.send = function (token,session,value,annotation) {
    var packet={
        accepted:value
    };
    if(annotation)
        packet={
            skyline:value
        };
    
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+session,
            type: "PUT",
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
        },
        data:JSON.stringify(packet),
        }).done(function () {
            resolve("Done");
        }).error(function (err) {
             var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Cannot load Tasks";    
            reject(error);
        });
    });
};
Repository.prototype.start = function (token,id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+id,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
            var session=result.session;
            $.ajax({
            url: "http://awt.ifmledit.org"+result.session,
            type: "POST",
            contentType: "application/json",
            
             headers: {
            "Authorization": "APIToken "+token
        },
        error: function(err, textStatus, errorThrown) { 
               
            if(err.status == 404 || err.status == 410  || errorThrown == 'Not Found' || errorThrown == 'Gone')
            {
                var e=new Error(err);
                e.textStatus=err.status;
                reject(e);
                
             }
             var error=new Error(err);
            if(err.status)
                error.status=err.status;
            else if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Couln't start a new session";    
            reject(error);
            },
        }).done(function () {
            resolve(session);
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
                error.textStatus="Cannot load Tasks";    
            reject(error);
        });
    });
};
Repository.prototype.getNext = function (token,session) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+session,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
        },
        error: function(err, textStatus, errorThrown) { 
               
            if(err.status == 404 || err.status == 410  || errorThrown == 'Not Found' || errorThrown == 'Gone')
            { 
                var e=new Error(err);
                e.textStatus=err.status;
                reject(e);
                
             }
             var error=new Error(err);
            if(err.status)
                error.status=err.status;
            else if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Couln't start a new session";    
            reject(error);
            },
        }).done(function (result) {
           resolve(result);
        });
    });
};
Repository.prototype.getStatistics = function (token,id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+id,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
             $.ajax({
            url: "http://awt.ifmledit.org"+result.statistics,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
            resolve(result);
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
                error.textStatus="Cannot load Tasks";    
            reject(error);
        });
    });
};
exports.Repository = Repository;
exports.createRepository = Repository;
