const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
const Groups = require("../models/groups");

// all events sorted by date and time

exports.viewevents =  function (req, res, next) {
    return Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('adminevents', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

exports.viewgroups = (req, res, next) => {
    return Groups.findAll()
        .then((data) => {
            res.render('admingroups', {grouplist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}