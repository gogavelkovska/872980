/*jslint node:true */
"use strict";

var ko = require('knockout');
var self;
function ViewModel(ctx) {
    self = this;
    ctx.repositories.checkToken.check(ctx);
    self.context=ctx;
    self.firstName = ko.observable('First');
    self.lastName = ko.observable('Last');
    self.users = ko.observableArray();
    self.workers = ko.observableArray();
    self.campaign={};
    self.ready=ko.observable();
    self.started=ko.observable();
    self.ended=ko.observable();
    self.name=ko.observable();
    self.selection_replica=ko.observable();
    self.annotation_replica=ko.observable();
    self.threshold=ko.observable();
    self.resultModify=ko.observable();
    self.annotation_size=ko.observable();
    self.uploadError=ko.observable();
    self.nameerror=ko.observable();
    self.selection_error=ko.observable();
    self.annotation_error=ko.observable();
    self.thresholderror=ko.observable();
    self.id=self.context.repositories.campaign.currentCampaign.id;
    self.imageUrl={};
    self.line=ko.observable();
    self.size=ko.observable();
    self.PublishError=ko.observable();
    self.TerminateError=ko.observable();
    //self.annotation_size=ko.observable();
    self.items=ko.observableArray([]);
    self.selected=ko.observable();
    self.accepted=ko.observable();
    self.rejected=ko.observable();
    self.annotations=ko.observableArray();
    self.details=ko.observable();
    self.clearAnnotation=function(){
        self.context.repositories.lineDrawer.clear();
    };
    self.showAnnotation=function(){
            
            var line=this.annotation;
           
            self.line(line);
            self.context.repositories.lineDrawer.showAnnotation(line);
    };
    self.context.repositories.campaign.getDetails(self.context.repositories.token,self.id).then(function(result){
        
        self.campaign=result;
        self.size(result.annotation_size);
        self.name(result.name);
        self.selection_replica(result.selection_replica);
        self.annotation_replica(result.annotation_replica);
        self.threshold(result.threshold);
        self.annotation_size(result.annotation_size);
        if(result.status==="ready")
            self.ready(true);
        else if(result.status==="started")
            self.started(true);
        
        self.imageUrl=result.image;
     self.context.repositories.images.getImages(self.context.repositories.token,result.image).then(function(result){
        self.items(result);
    }).catch(function(e){
         if (e.textStatus) {
                alert(e.textStatus);
            } else {
                console.log(e);
            }
    });   
    self.context.repositories.workers.getWorkers(self.context.repositories.token,self.campaign.worker).then(function(result){
        for(var i=0;i<result.length;i++)
        {
            if(result[i].selector)
            {
                result[i].selection="DeSelect";
            }
            else
                result[i].selection="Select";
                if(result[i].annotator)
            {
                result[i].annotation="DeAnnotate";
            }
            else
                result[i].annotation="Annotate";
        }
        self.workers(result);
    }).catch(function(e){
        if (e.textStatus) {
                alert(e.textStatus);
            } else {
                console.log(e);
            }
    });
    if(result.status==="ended")
    {
         self.context.repositories.campaign.getCampaignStatistics(self.context.repositories.token,result.statistics).then(function(res){
             res.name=result.name;
        self.details(res);
        
        self.ended(true);
    }).catch(function(e){
         if (e.textStatus) {
                alert(e.textStatus);
            } else {
                console.log(e);
            }
    });   
    }
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
    self.select=function(){

        self.selected(undefined);
        var item=this;
        
        if(!self.started())
            return;
        self.context.repositories.images.getStatistics(self.context.repositories.token,item.id).then(function(result){
            self.accepted(result.selection.accepted);
            self.rejected(result.selection.rejected);
            var annotations=result.annotation;
            var items=[];
           for(var i=0;i<annotations.length;i++)
        {
            items[i]={};
            items[i].annotation=annotations[i];
            items[i].id="Annotation "+(i+1);
        }
            self.annotations(items);
            
            self.selected('http://awt.ifmledit.org'+item.canonical);
            self.context.repositories.lineDrawer.disable();
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                console.log(e);
            }
		});
        
    };
    self.selection=function(){
        var item=this;
        self.context.repositories.workers.selection(self.context.repositories.token,this.id,this.selector).then(function(){
            self.context.repositories.workers.getWorkers(self.context.repositories.token,self.campaign.worker).then(function(result){
        for(var i=0;i<result.length;i++)
        {
            if(result[i].selector)
            {
                result[i].selection="DeSelect";
            }
            else
                result[i].selection="Select";
                if(result[i].annotator)
            {
                result[i].annotation="DeAnnotate";
            }
            else
                result[i].annotation="Annotate";
        }
        self.workers(result);
    });
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                alert("smth wrong");
            }
		});
    };
    self.annotation=function(){
        var item=this;
         self.context.repositories.workers.annotation(self.context.repositories.token,this.id,this.annotator).then(function(){
           self.context.repositories.workers.getWorkers(self.context.repositories.token,self.campaign.worker).then(function(result){
        for(var i=0;i<result.length;i++)
        {
            if(result[i].selector)
            {
                result[i].selection="DeSelect";
            }
            else
                result[i].selection="Select";
                if(result[i].annotator)
            {
                result[i].annotation="DeAnnotate";
            }
            else
                result[i].annotation="Annotate";
        }
        self.workers(result);
    });
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                alert("smth wrong");
            }
		});
    };
    self.add = function () {
        self.users.push({
            first: self.firstName(),
            last: self.lastName(),
        });
    };
    self.modify=function(){
        self.resultModify(undefined);
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
			self.context.repositories.campaign.create(self.context.repositories.token,packet,"modify",self.context.repositories.campaign.currentCampaign.id).then(function (result) {
          self.resultModify("Campaign Modified");
        }).catch(function (e) {
            if (e.textStatus) {
                alert(JSON.stringify(e.textStatus));
            } else {
                alert("smth wrong");
            }
		});
        }
    };
    self.publish=function(){
            self.PublishError(undefined);
            self.context.repositories.campaign.publish(self.context.repositories.token,self.campaign.execution).then(function(result){
                self.ready(undefined);
                self.started(true);
                self.campaign.status="started";
            }).catch(function (e){
            if(e.textStatus)
                self.PublishError(e.textStatus);
            else
                self.PublishError("Couldn't Publish");
            });
    };
    self.terminate=function(){
            self.TerminateError(undefined);
            self.context.repositories.campaign.terminate(self.context.repositories.token,self.campaign.execution).then(function(result){
                self.started(undefined);
                self.ended(true);
                self.campaign.status="ended";
            }).catch(function (e){
            if(e.textStatus)
                self.TerminateError(e.textStatus);
            else
                self.TerminateError("Couldn't Terminate");
            });
    };
    self.upload=function(inputs)
    {
       var input=document.getElementById("files");
      
       self.uploadError("uploading");
       var file=input.files[0];
       input.files=undefined;
       if(!file)
        return;
       self.context.repositories["images"].upload(self.context,file).then(function (result) {
          
               self.context.repositories.images.getImages(self.context.repositories.token,self.imageUrl).then(function(result){
        self.items(result);
    }).catch(function(e){
         if (e.textStatus) {
                alert(e.textStatus);
            } else {
                console.log("error");
            }
    });
        }).catch(function (e) {
            var message="Failed to upload image ";
            if (e.textStatus) {
              self.uploadError(message+e.textStatus);
            } else {
                self.uploadError(message+e.message);
            }
        });
    };
    self.delete=function(){
       var item=this;
        self.context.repositories["images"].delete(self.context,item.id).then(function (result) {
          self.items.splice(self.users.indexOf(item), 1);
              
          
        }).catch(function (e) {
            var message="Failed to delete image ";
            if (e.textStatus) {
              self.uploadError(message+e.textStatus);
            } else {
                self.uploadError(message+e.message);
            }
        });
    };
   
}

exports.register = function () {
    ko.components.register('campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
