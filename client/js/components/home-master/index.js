/*jslint node:true */
"use strict";

var ko = require('knockout');
function clicked(){
    click=true;
}
var click=false;
function ViewModel(ctx) {
    var self = this;
    ctx.repositories.checkToken.check(ctx);
    self.context=ctx;
    self.firstName = ko.observable('First');
    self.lastName = ko.observable('Last');
    self.users = ko.observableArray();
    self.name=ko.observable("");
    self.selection_replica=ko.observable();
    self.annotation_replica=ko.observable();
    self.threshold=ko.observable();
    self.annotation_size=ko.observable();
    
    self.nameerror=ko.observable();
    self.selection_error=ko.observable();
    self.annotation_error=ko.observable();
    self.thresholderror=ko.observable();
    //self.annotation_size=ko.observable();
    self.items=ko.observableArray([]);
    self.campaigns={};
    self.context.repositories.campaign.getCampaigns(self.context.repositories.token).then(function(result){
        for(var i=0 ;i< result.length;i++)
            result[i].clicked=false;
        self.campaigns=result;
        self.items(result);
    }).catch(function(e){
         if (e.textStatus) {
                alert(e.textStatus);
            } else {
                console.log(e);
            }
    });
    self.name.subscribe(function(){
        self.nameerror(undefined);
    });
    self.selection_replica.subscribe(function(){
        self.selection_error(undefined);
    });
    self.threshold.subscribe(function(){
        self.thresholderror(undefined);
    });
    self.annotation_replica.subscribe(function(){
        self.annotation_error(undefined);
    });
    self.details=function(item) {
        if(!item.clicked)
           { 
               for(var i=0;i<self.campaigns.length;i++){
                    if(self.campaigns[i].id==item.id)
                {
                    self.campaigns[i].clicked=true;
                }
            }
                self.items(self.campaigns);
               return;}
        self.context.repositories.campaign.currentCampaign=item;
        document.getElementById('goToDetails').click();
        
    };
    
    self.add = function () {
        self.users.push({
            first: self.firstName(),
            last: self.lastName(),
        });
    };
    self.create=function(){
        var err=false;
		if(self.name()==='')
		{
			self.nameerror('Cannot be empty');
			err=true;
		}
	
		if(!err)
		{
			var packet={
				"name": self.name(),
    			"selection_replica":parseInt( self.selection_replica()),
    			"threshold": parseInt(self.threshold()),
    			"annotation_replica":parseInt(self.annotation_replica()),
                "annotation_size":parseInt(self.annotation_size())
			};
           
			self.context.repositories.campaign.create(self.context.repositories.token,packet).then(function (result) {
           self.items.push({
               id:result,
               name:self.name(),
               status:"ready"
           });
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                console.log(e);
            }
		});
        }
    };
    self.remove = function () {
        // this is the user not the VM
        self.users.splice(self.users.indexOf(this), 1);
    };
}

exports.register = function () {
    ko.components.register('home-master', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
