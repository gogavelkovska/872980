/*jslint node:true */
/*globals alert*/
"use strict";

var ko = require('knockout');

exports.register = function () {
    ko.components.register('user-form', {
        template: require('./template.html')
    });
};
function ViewModel(params){
    var self=this;
    self.context=params.context;
    self.fullname=ko.observable("");
    self.nameError=ko.observable();
    self.passError=ko.observable();
    self.saveError=ko.observable();
    self.password=ko.observable("");
    self.result=ko.observable("");
    self.fullname.subscribe(function(){
        self.nameError(undefined);
        self.result("");
        self.saveError(undefined);
    });
    self.password.subscribe(function(){
        self.passError(undefined);
        self.result("");
        self.saveError(undefined);
    });
    self.back=function(){
            document.getElementById("indexLink").click();
            
    };
    self.save=function(){
         var e=false;
         if(self.password().length<8&self.password().length>0)
         {
             self.passError("Minimum Password Length is 8 characters");
             e=true;
         }
         if(!e){
            var packet={
            };
            if(self.fullname()!="")
                packet.fullname=self.fullname();
            if(self.password()!="")
                packet.password=self.password();
            self.context.repositories.modifyApi.modify(self.context.repositories.token,packet).then(function (result) {
            
            self.result(result);
            document.getElementById("indexLink").click();
            document.getElementById("profile-link").click();
        }).catch(function (e) {
            if (e.textStatus) {
                self.saveError(JSON.stringify(e.textStatus));
            } else {
                self.saveError("smth wrong");
            }
		});
    };
         }
    
}
exports.register = function () {
    ko.components.register('user-form', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};