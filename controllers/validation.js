var models = require('../models');

module.exports = function (router) {
    'use strict';

    router.route('/')
        .get(function (req, res, next) {
            if (typeof req.query.type === 'undefined') {
                return res.json({data: "You must provide type param", code: 500});
            }
            switch (req.query.type) {
                case "phone":
                    phoneUnique(req, res);
                    break;
                case "email":
                    emailUnique(req, res);
                    break;
                case "building":
                    buildingUnique(req, res);
                    break;
                default:
                    return res.json({data: "Type not found", code: 500});
            }
        });
    function phoneUnique(req, res) {
        models.wl.collections.inhabitant.find({
            "phoneNumber": req.query.value
        })
            .then(function (inhabitants) {
                res.json({
                    data: inhabitants.length == 0,
                    code: 200
                });
            }).catch(function (err) {
            res.json({data: err.toString(), code: 500});
        });
    }
    function emailUnique(req, res) {
        models.wl.collections.inhabitant.find({
            "email": req.query.value
        })
            .then(function (inhabitants) {
                res.json({
                    data: inhabitants.length == 0,
                    code: 200
                });
            }).catch(function (err) {
            res.json({data: err.toString(), code: 500});
        });
    }
    function buildingUnique(req, res) {
        models.wl.collections.inhabitant.find({
            "appartment": req.query.value,
            "building": req.query.valueAdd
        })
            .then(function (inhabitants) {
                res.json({
                    data: inhabitants.length == 0,
                    code: 200
                });
            }).catch(function (err) {
            res.json({data: err.toString(), code: 500});
        });
    }
};