/*jslint node:true, nomen: true */
"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = "http://awt.ifmledit.org";
    this.images={};
}

Repository.prototype.getStatistics = function (token,id) {
    var self = this;
    var url=id;
   
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+url,
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
                error.textStatus="Couldn't load images";    
            reject(error);
        });
    });
};
Repository.prototype.getImages = function (token,campaign) {
    var self = this;
    var url=campaign;
   //alert("http://awt.ifmledit.org"+url);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org"+url,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
             headers: {
            "Authorization": "APIToken "+token
            },
        }).done(function (result) {
            self.images=result.images;
            resolve(result.images);
        }).error(function (err) {
             var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Couldn't load images";    
            reject(error);
        });
    });
};
Repository.prototype.upload = function (context,image) {
    var self = this;
    var fd = new FormData();
        fd.append("image", image); // Append the file
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" +""+context.repositories.campaign["currentCampaign"].image,
            type: "POST",
            contentType: false,
            processData: false,
            data:fd,
             headers: {
            "Authorization": "APIToken "+context.repositories["token"]
            },
        }).done(function (result,a,request) {
            resolve(request.getResponseHeader("Location"));
        }).error(function (err) {
            /*var error = new Error(errorThrown);
            error.responseText =  $.parseJSON(jqXHR.responseText);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.errors;*/
            var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Upload Failed";    
            reject(error);
        });
    });
};
Repository.prototype.delete = function (context,image) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://awt.ifmledit.org" +image,
            type: "DELETE",
            contentType: "application/json",
             headers: {
            "Authorization": "APIToken "+context.repositories["token"]
            },
        }).done(function (result,a,request) {

            resolve("Deleted");
        }).error(function (err) {
            /*var error = new Error(errorThrown);
            error.responseText =  $.parseJSON(jqXHR.responseText);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.errors;*/
            var error=new Error(err);
            if(err.responseJSON)
                error.textStatus=JSON.stringify(err.responseJSON.error);
            else if(err.responseText)
                error.textStatus=err.responseText;
            else if (err.message)
                error.textStatus=err.message;
            else
                error.textStatus="Upload Failed";    
            reject(error);
        });
    });
};
exports.Repository = Repository;
exports.createRepository = Repository;
