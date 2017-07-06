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

Repository.prototype.check = function (context) {
    
    if(context.repositories.token==="")
    {
        document.getElementById("bs-example-navbar-collapse-1").style.visibility = 'hidden';
        document.getElementById("indexLink").click();
    }
};
Repository.prototype.checkIndex = function (context) {
    if(context.repositories.token!="")
    {

        document.getElementById("bs-example-navbar-collapse-1").style.visibility = 'visible';
        document.getElementById("home-button").click();
    }
};

exports.Repository = Repository;
exports.createRepository = Repository;
