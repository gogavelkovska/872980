/*jslint node:true */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.context=ctx;
    document.getElementById("user-details").style.display="block";
    document.getElementById("user-form").style.display="none";
    self.context.repositories.checkToken.check(self.context);
    self.fullname = ko.observable('');
    self.username = ko.observable('');
    self.type = ko.observable('');
    self.userError=ko.observable();
    self.changeData=function(){
        document.getElementById("user-details").style.display="none";
         document.getElementById("user-form").style.display="block";
    };
    self.context.repositories.userApi.userDetails(self.context.repositories.token).then(function (result) {
            
           self.fullname(result.fullname);
           self.username(result.username);
           self.type(result.type);
        }).catch(function (e) {
            if (e.textStatus) {
                self.userError(JSON.stringify(e.textStatus));
            } else {
                self.userError("smth wrong");
            }
		}).catch(function(e){
            console.log(e);
        });
    };


exports.register = function () {
    ko.components.register('profile', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
