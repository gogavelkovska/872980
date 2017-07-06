/*jslint node:true */
/*globals alert*/
"use strict";

var ko = require('knockout');

exports.register = function () {
    ko.components.register('log-out', {
        template: require('./template.html')
    });
};
function ViewModel(params){
    var self=this;
    self.context=params.context;
    self.message=ko.observable("");
    self.logOut=function(){
         
    
    self.context.repositories.logOutApi.logOut(self.context.repositories.token).then(function (result) {
            
            document.getElementById("bs-example-navbar-collapse-1").style.visibility = 'hidden';
           self.context.repositories.token="";
            document.getElementById("indexLink").click();
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                alert("smth wrong");
            }
		});
    };
}
exports.register = function () {
    ko.components.register('log-out', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};