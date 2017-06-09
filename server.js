"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    properties = require('./server/property-service'),
    brokers = require('./server/broker-service'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

app.get('/properties', properties.findAll);
app.get('/properties/favorites', properties.getFavorites);
app.get('/properties/:id', properties.findById);
app.post('/properties/favorites', properties.favorite);
app.delete('/properties/favorites/:id', properties.unfavorite);

app.get('/users/:userId/favorites', properties.getFavorites);
app.post('/users/:userId/favorites', properties.favorite);
app.delete('/users/:userId/favorites/:propertyId', properties.unfavorite);

app.get('/brokers', brokers.findAll);
app.get('/brokers/:id', brokers.findById);

app.listen(app.get('port'), function () {
    console.log('DreamHouse server listening on port ' + app.get('port'));
});