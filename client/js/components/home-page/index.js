/*jslint node:true */
/*globals alert*/
"use strict";

var ko = require('knockout');
var context;
exports.register = function () {
    ko.components.register('home-page', {
        template: require('./template.html')
    });
};
function ViewModel(ctx) {
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});


    var self = this;
	var c=ctx;
	context=c;
	c.repositories.checkToken.checkIndex(c);
    self.fullName = ko.observable('');
	self.nameerror=ko.observable();
    self.username = ko.observable('');
	self.usererror=ko.observable();
    self.password = ko.observable('');
	self.passerror=ko.observable();
	self.confirm = ko.observable('');
	self.confirmerror=ko.observable();
	self.manager = ko.observable(true);
    self.logInUsername=ko.observable();
    self.logInPassword=ko.observable();
    self.logInUsernameError=ko.observable();
    self.logInPasswordError=ko.observable();
	self.fullName.subscribe(function () {
        self.nameerror(undefined);
    });
    self.username.subscribe(function () {
        self.usererror(undefined);
    });
	self.password.subscribe(function () {
        self.passerror(undefined);
    });
    self.confirm.subscribe(function () {
        self.confirmerror(undefined);
    });
	self.logInUsername.subscribe(function () {
        self.logInUsernameError(undefined);
    });
    self.logInPassword.subscribe(function () {
        self.logInPasswordError(undefined);
    });
	self.register=function(ctx){
		
		var err=false;
		if(self.fullName()==='')
		{
			self.nameerror('Cannot be empty');
			err=true;
		}
		
		if(self.username()==='')
		{
			self.usererror('Cannot be empty');
			err=true;
		}
		if(self.password()==='')
		{
			self.passerror('Cannot be empty');
			err=true;
		}
		if(!(self.confirm()===self.password()))
		{
			self.passerror('Doesnt Match Password');
			err=true;
		}
		var type;
		if(self.manager())
		{
			type="master";
		}
		else
			type="worker";
		if(!err)
		{
			var packet={
				"fullname": self.fullName(),
    			"username": self.username(),
    			"password": self.password(),
    			"type": type

			};
			
			c.repositories.registerAPI.register(packet).then(function (result) {
            alert(result);
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                alert("smth wrong");
            }
		});
}
	};
    self.logIn=function(){
        var err=false;
		if(self.logInUsername()==='')
		{
			self.logInUsernameError('Insert Username');
			err=true;
		}
		
		if(self.logInPassword()==='')
		{
			self.logInPasswordError('InsertPassword');
			err=true;
		}
        if(!err)
        {
           var packet={
				"username": self.logInUsername(),
    			"password": self.logInPassword(),
			};
			
			c.repositories.logInAPI.logIn(packet).then(function (token) {
           c.repositories.token=token;
		   c.repositories["userApi"].userDetails(token).then(function(user){
			  
			   document.getElementById("bs-example-navbar-collapse-1").style.visibility = 'visible';
				context.app.setHome("/"+user.type);
				document.getElementById("home-button").click();
		   });
           
        }).catch(function (e) {
            if (e.textStatus) {
                alert(e.textStatus);
            } else {
                alert("smth wrong");
            }
		});
        }
    };
}

exports.register = function () {
    ko.components.register('home-page', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};