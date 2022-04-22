const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");

// all events sorted by date and time
/*
exports.viewevents =  function (req, res, next) {
    return Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}
*/

exports.viewevents =  function (req, res, next) {
    return Events.findAll
    ({ order: [['dato'],['tid']][Sequelize.fn(date_format, Sequelize.col('date_col'), '%d-%m-%y')]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

// events sorted by date and time ascendeing
/*exports.vieweventsasc = (req, res, next) => {
    return Events.findAll({ order: [['dato', 'ASC'],['tid','ASC']]})
        .then((data) => {
            res.render('events', {eventlist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}
*/