const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/calevents");



exports.calendar =  function (req, res, next) {
    return Events.findAll({ order: [['dato'],['tid']]})
    .then(function(data) {
        const caldata = data.map(obj => {
            return {
                title: obj.event_name,
                start: obj.dato,
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
