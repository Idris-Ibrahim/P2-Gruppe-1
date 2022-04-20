const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");

// all events sorted by date and time
exports.viewevents = (req, res, next) => {
    return Events.findAll({ order: [['dato'],['tid']]})
        .then((data) => {
            res.render('events', {eventlist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}

// events sorted by date and time ascendeing
exports.vieweventsasc = (req, res, next) => {
    return Events.findAll({ order: [['dato', 'ASC'],['tid','ASC']]})
        .then((data) => {
            res.render('events', {eventlist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}
