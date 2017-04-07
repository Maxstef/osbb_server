var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
var jwt = require('express-jwt');
var Config = require('config');
var boom = require('express-boom');

module.exports = function (app) {
    'use strict';

    Object.keys(routes).forEach(function (routeName) {
        var router = express.Router();

        // app.use(jwt({ secret: Config.get("auth.jwtPrivateKey")}).unless({path: ['/login','/users','/user-unique', '/blogs']}));
        app.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401, 'Invalid JWT token');
            }
        });
        
        app.use(express.static('userfiles'));

        require('./' + routeName)(router);
        app.use('/' + changeCase.paramCase(routeName), router);
    });
};