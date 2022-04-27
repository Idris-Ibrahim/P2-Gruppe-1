const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");

// all events sorted by date and time

exports.viewevents =  function (req, res, next) {
    return Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}


// all events sorted by date DESC
exports.eventsdesc =  function (req, res, next) {
    return Events.findAll({ order: [['dato','tid','DESC']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

// alle events sortert efter navn ASC
exports.eventnameasc =  function (req, res, next) {
    return Events.findAll({ order: ['event_name']})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}
// alle events sortert efter navn DESC
exports.eventnamedesc =  function (req, res, next) {
    return Events.findAll({ order: [['event_name','DESC']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

exports.eventcreate = function (req, res, next){
connection
.sync(/*{force:true}*/)
.then((result) => {
    //dato skal være: (år-måned-dag):
    Events.create({ orgname: req.body.org_name,
                    event_name: req.body.event_name,
                    lokation: req.body.event_lokation,
                    tid: req.body.event_tid,
                    dato: req.body.event_dato,
                    pris: req.body.event_pris,
                    pris: req.body.event_fburl});
                    
    console.log(result);
})
// catch error
.catch ((err) => {
    console.log(err);
});
}

exports.eventdelete = function(req, res, next){
    await Events.destroy({
        //
        where: {id: req.body.id}
    });
}

exports.eventupdate = function(req, res, next){
    
    Events.update(
        // Values to update
        {   orgname: req.body.org_name,
            event_name: req.body.event_name,
            lokation: req.body.event_lokation,
            tid: req.body.event_tid,
            dato: req.body.event_dato,
            pris: req.body.event_pris,
            pris: req.body.event_fburl
        },
        {
            where: {id: req.body.id}
        },
        console.log(result))
        //catching error
    .catch ((err) => {
        console.log(err);
    });
}