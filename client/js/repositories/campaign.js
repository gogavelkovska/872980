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

Repository.prototype.create = function (token,packet,method,url) {
    if(method)
        method="PUT";
    else{
        method="POST";
        url="/api/campaign";
    }
        
    
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+url,
            type: method,
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+token
            },
            data:JSON.stringify(packet),
        }).done(function (result,a,request) {
            resolve(request.getResponseHeader("Location"));
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
Repository.prototype.getCampaigns = function (token) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org/api/campaign",
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
            resolve(result.campaigns);
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
Repository.prototype.getCampaignStatistics = function (token,statistics) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+statistics,
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
                error.textStatus="Cannot Load statistics";    
            reject(error);
        });
    });
};
Repository.prototype.getDetails = function (token,id) {
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
            self.currentCampaign=result;
            self.currentCampaign.id=id;
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
