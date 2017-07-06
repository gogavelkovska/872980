/*jslint node:true */
"use strict";

exports.createRepositories = function (options) {
    return {
        adder: require('./adder').createRepository(options),
        registerAPI:require('./registerAPI').createRepository(options),
        logInAPI:require('./logInAPI').createRepository(options),
        logOutApi:require('./logOutAPI').createRepository(options),
        checkToken:require('./checkToken').createRepository(options),
        userApi:require('./user').createRepository(options),
        modifyApi:require('./modify').createRepository(options),
        campaign:require('./campaign').createRepository(options),
        images:require('./images').createRepository(options),
        workers:require('./workers').createRepository(options),
        tasks:require('./tasks').createRepository(options),
        token:"",
        type:""
    };
};
