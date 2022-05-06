const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups");
const Events = require("../models/events");

exports.viewevents =  function (req, res, next) {
    console.log(req.session)
    return Events.findAll({order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('eventinfo', {eventlist: data },
                console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
        });
}