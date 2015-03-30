var attractionsRouter = require('express').Router();
var models = require('../models');

attractionsRouter.get('/hotels/:name', function (req, res, next) {
	//console.log("ENTERED HOTELS/NAME", req.params.name);
    models.Hotel.findOne({name: req.params.name}, function(err, data){
        if (err) return next(err);
        res.json(data);
    });
});

attractionsRouter.get('/restaurants/:name', function (req, res, next) {

    models.Restaurant.findOne({name: req.params.name}, function(err, data){
        if (err) return next(err);
        res.json(data);
    });
});

attractionsRouter.get('/things/:name', function (req, res, next) {

    models.ThingToDo.findOne({name: req.params.name}, function(err, data){
        if (err) return next(err);
        res.json(data);
    });
});

module.exports = attractionsRouter;