"use strict";

let PROPERTIES = require('./mock-properties').data,
    favorites = [];

exports.findAll = (req, res, next) => {
    let key = req.query.key;
    if (key) {
        let result = PROPERTIES.filter(property =>
            (property.title +  ' ' + property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key.toUpperCase()) > -1);
        return res.send(result);
    } else {
        return res.json(PROPERTIES);
    }
};

exports.findById = (req, res, next) => {
    let id = req.params.id;
    res.json(PROPERTIES[id - 1]);
}

exports.getFavorites = (req, res, next) => {
    res.json(favorites);
}

exports.favorite = (req, res, next) => {
    let property = req.body;
    let exists = false;
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === property.id) {
            exists = true;
            break;
        }
    }
    if (!exists) favorites.push(property);
    res.send("success")
}

exports.unfavorite = (req, res, next) => {
    let id = req.params.id;
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id == id) {
            favorites.splice(i, 1);
            break;
        }
    }
    res.json(favorites)
}

exports.like = (req, res, next) => {
    let property = req.body;
    PROPERTIES[property.id - 1].likes++;
    res.json(PROPERTIES[property.id - 1].likes);
}
