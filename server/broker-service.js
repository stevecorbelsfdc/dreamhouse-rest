"use strict";

let BROKERS = require('./mock-brokers').data;

exports.findAll = (req, res, next) => {
    return res.json(BROKERS);
};

exports.findById = (req, res, next) => {
    let id = req.params.id;
    res.json(BROKERS[id - 1]);
}
