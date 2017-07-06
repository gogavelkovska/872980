/*jslint node:true */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.context=ctx;
    ctx.repositories.checkToken.check(ctx);
    self.repository=self.context.repositories.tasks;
    self.items=ko.observableArray();
    self.loadError=ko.observable();
    self.details=ko.observable({});
    self.session=ko.observable();
    self.executing=ko.observable();
    self.selectionTask=ko.observable();
    self.annotationTask=ko.observable(false);
    self.line=ko.observable();
    self.image=ko.observable();
    self.size=ko.observable();
    document.getElementById("annotation").style.display="none";
   
    self.repository.getTasks(self.context.repositories.token).then(function(result){
        self.items(result);
    }).catch(function(e){
        if(e.textStatus)
            self.loadError(e.textStatus);
        else
            console.log(e);
    });
   
    self.statistics=function(){
            var item=this;
            self.repository.getStatistics(self.context.repositories.token,item.id).then(function(result){
                if(item.type==="selection")
                    {
                        result.selection=true;
                    }
                else
                    {
                        result.annotation=true;
                    }
                self.details(result);
            }).catch(function(e){
                if(e.textStatus)
                     self.loadError(e.textStatus);
                 else
                    console.log(e);
            });
    };
    self.annotate=function(){
        var value=self.line();
        self.repository.send(self.context.repositories.token,self.session(),value,"annotation").then(function(){
            self.repository.getNext(self.context.repositories.token,self.session()).then(function(task){
                if(task.type==="selection")
                    {
                        self.selectionTask(task);
                        self.annotationTask(false);
                        
                    }
                else
                {
                        document.getElementById("annotation").style.display="block";
                        self.selectionTask(undefined);
                        self.annotationTask(true);
                        self.image(task.image);
                        self.size(task.size);
                }
            });
        }).catch(function(e){
                if(e.textStatus==404||e.textStatus==="Not Found")
                    {
                        alert("No more Images");
                        self.details({});
                        self.executing(false);
                        self.session(undefined);
                    }
                else if(e.textStatus)
                    {   
                        alert(e.textStatus);
                       
                        }
                  
                 else
                    console.log(e);
            });
    };
    self.clear=function(){
        self.drawer=self.context.repositories.lineDrawer;
        self.drawer.clear();
    };
    self.select=function(value){
        self.repository.send(self.context.repositories.token,self.session(),value).then(function(){
            self.repository.getNext(self.context.repositories.token,self.session()).then(function(task){
                if(task.type==="selection")
                    {
                        self.selectionTask(task);
                        self.annotationTask(false);
                        document.getElementById("annotation").style.display="none";
                    }
                else
                {
                        self.selectionTask(undefined);
                        self.annotationTask(true);
                }
            });
        }).catch(function(e){
                if(e.textStatus==404||e.textStatus==="Not Found")
                    {
                        alert("No more Images");
                        self.details({});
                        self.executing(false);
                        self.session(undefined);
                    }
                else if(e.textStatus)
                    {   
                        alert(e.textStatus);
                       
                        }
                  
                 else
                    console.log(e);
            });
    };
    
    self.executeTask=function(){
        var type=this.type;
        self.repository.start(self.context.repositories.token,this.id).then(function(session){
            self.session(session);
            var optional=undefined;
            if(type==="annotation")
                optional="annotation";
            self.repository.getNext(self.context.repositories.token,session,optional).then(function(task){
                self.executing(true);
                if(task.type==="selection")
                    {
                        self.selectionTask(task);
                        self.annotationTask(false);
                    }
                else
                {
                        document.getElementById("annotation").style.display="block";
                        self.selectionTask(undefined);
                        self.annotationTask(true);
                        self.image(task.image);
                        self.size(task.size);
                }
            });
        }).catch(function(e){
                if(e.textStatus==404||e.textStatus==="Not Found")
                    {
                        alert("No  Images");
                        self.details({});
                        self.executing(false);
                        self.session(undefined);
                    }
                else if(e.textStatus)
                    {   
                        alert(e.textStatus);
                       
                        }
                  
                 else
                    console.log(e);
            });
    };

    self.remove = function () {
        // this is the user not the VM
        self.users.splice(self.users.indexOf(this), 1);
    };
}

exports.register = function () {
    ko.components.register('home-worker', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
