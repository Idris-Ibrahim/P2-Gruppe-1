const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/calevents");



exports.calendar =  function (req, res, next) {
    return Events.findAll({ order: [['dato'],['tid']]})
    .then(function(data) {
        const caldata = data.map(obj => {
            const split = obj.tid.split(":");
            return {
                title: obj.event_name,
                // start: obj.dato.setSeconds(obj.dato.getSeconds()+(3600*split[0]) + (60*split[1]) + split[2]),
                start: obj.dato.setHours(split[0],split[1],split[2]),
                url: '/eventsinfo/?id='+ obj.id
            }
        })
        res.render('calendar', {eventlist: caldata})
        console.log(caldata);
    })
    .catch( function(err)  {
        console.log(err)
    });
}
