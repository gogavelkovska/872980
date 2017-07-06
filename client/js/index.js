/*jslint node:true */
"use strict";

var ko = require('knockout'),
    components = require('./components'),
    createRepositories = require('./repositories').createRepositories;

components.register();
var repositories = createRepositories();

function App() {
    this.routes = {
        '/': 'home-page',
        '/campaign': 'campaign',
        '/profile': 'profile',
        '/master': 'home-master',
        '/worker':'home-worker'
        
    };
    this.repositories = repositories;
    this.context=this;
    this.home=ko.observable("/master");
}
App.prototype.setHome=function(home){
    this.home(home);
};
ko.applyBindings(new App());
