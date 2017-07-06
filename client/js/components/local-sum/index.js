/*jslint node:true */
"use strict";

var ko = require('knockout');

function ViewModel() {
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
        var a = parseInt(self.a(), 10),
            b = parseInt(self.b(), 10);
        self.result('');
        if (isNaN(a)) {
            self.aError('Invalid Data');
        } else if (isNaN(b)) {
            self.bError('Invalid Data');
        } else {
            self.result(a + b);
        }
    };
}

exports.register = function () {
    ko.components.register('local-sum', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
