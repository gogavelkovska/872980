/*jslint node:true */
"use strict";

exports.register = function (options) {
    require('./home-page').register(options);
    require('./profile').register(options);
    require('./home-master').register(options);
    require('./local-sum').register(options);
    require('./home-worker').register(options);
    require('./remote-sum').register(options);
    require('./log-out').register(options);
    require('./user-form').register(options);
    require('./campaign').register(options);
    require('./line-drawer').register();
};
