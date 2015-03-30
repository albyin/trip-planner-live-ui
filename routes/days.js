var dayRouter = require('express').Router();
var models = require('../models');
var Day = models.Day;
var currDay = 1;

var attractionRouter = require('express').Router({mergeParams: true});
//defined attractionRouter to get rid of undefined error, not sure if this is right way

// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    //use mongoose to grab the day Schema
    
    Day.find({}, function(err, data){
        if (err) return next(err);
        res.json(data);
    });
});

// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    // save day to day Schema, return saved day as 
    console.log("req.params.body, ", req.params.body);
    var day = new Day();
    
    day.save(function (err, savedDay) {
        if (err) return next(err);
        res.json( savedDay);
    });
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
    Day.findOne({"number": req.params.id})
        .populate("hotel")
        .populate("restaurants")
        .populate("thingsToDo")
        .exec(function (err, data){
            if (err) return next(err);
            res.json(data);
    });

});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
});


/********* Editing properties for specific days *************/
dayRouter.use('/:dayNum', attractionRouter);

// POST /days/:id/hotel (creates a reference to the hotel)
attractionRouter.post('/hotel', function (req, res, next) {

    Day.findOne({ 'number': req.params.dayNum }, function (err, day) {
        if (err) return next(err);
      
        day.hotel = req.body._id;
        day.save(function(err, data){
            if (err) return next(err);
            res.json(data);
        });
    });
});

// DELETE /days/:id/hotel (deletes the reference of the hotel)
attractionRouter.delete('/hotel', function (req, res, next) {
     
});

// POST /days/:id/restaurants (creates a reference to a restaurant)
attractionRouter.post('/restaurants', function (req, res, next) {

    Day.findOne({ 'number': req.params.dayNum }, function (err, day) {
        if (err) return next(err);
      
        day.restaurants.push(req.body._id);
        day.save();
    });  
});

// DELETE /days/:dayId/restaurants/:restId (deletes a reference to a restaurant)
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    
});

// POST /days/:id/thingsToDo (creates a reference to a thing to do)
attractionRouter.post('/thingsToDo', function (req, res, next) {

    Day.findOne({ 'number': req.params.dayNum }, function (err, day) {
        if (err) return next(err);
      
        day.thingsToDo.push(req.body._id);
        day.save();
    });     
});

// DELETE /days/:dayId/thingsToDo/:thingId (deletes a reference to a thing to do)
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
     
});

module.exports = dayRouter;
