/*jslint node:true */
/*globals alert*/
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.a = ko.observable('1');
    self.aError = ko.observable();
    self.b = ko.observable('2');
    self.bError = ko.observable();
    self.result = ko.observable('');
    self.a.subscribe(function () {
        self.aError(undefined);
    });
    self.b.subscribe(function () {
        self.bError(undefined);
    });
    
    self.add = function () {
        ctx.repositories.adder.add(
            parseInt(self.a(), 10),
            parseInt(self.b(), 10)
        ).then(function (result) {
            self.result(result);
        }).catch(function (e) {
            if (e.errors) {
                self.aError(e.errors.a);
                self.bError(e.errors.b);
            } else {
                alert(e.message);
            }
        });
    };
}

exports.register = function () {
    ko.components.register('remote-sum', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
