const Sequelize = require("sequelize");
const Fullcalendar = require('fullcalendar');
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");


exports.calendar =  function (req, res, next) {
    return Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('calendar', {eventlist: data }, {calendermodule: Fullcalendar});
        })
        .catch( function(err)  {
            console.log(err)
        });
}
