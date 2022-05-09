const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
const { grouproleone } = require("./groupscontroller");
const Groups = require("../models/groups");

//datetime of the current date for referencing:
let today = new Date()
let today1 = new Date()
today1.setDate(today.getDate() + 1);

// all events sorted by date and time without the

exports.viewevents =  function (req, res, next) {
    console.log(req.session)
    return Events.findAll(
        {order: [['dato', 'ASC'],['tid', 'ASC']],
        where: {'dato' :{ [Op.gt]: today}}})
        .then(function(data) {
            res.render('events', {eventlist: data },
            console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
        });
}


exports.vieweventsforgroup =  function (req, res, next) {
    if(req.session.loggedIn !== true){
        res.redirect('/login')
        return
    }
    if (req.session.Group.roles < 1){
        res.render("NoPermission")
        return
    }
    console.log(req.session)
    return Events.findAll({where: {group_id : req.session.Group.id},
        order: [['dato', 'ASC'],['tid', 'ASC']]})
        .then(function(data) {
            res.render('grouppanel', {yourevent: data },
            console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
        });
}


// all events sorted by date DESC
exports.eventsdesc =  function (req, res, next) {
    return Events.findAll({ order: [['dato','DESC'],['tid','DESC']]})
        .then(function(data) {
            res.render("NoPermission");
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
    return Events.findAll({include: [{model: Groups, as: 'group_name'}]},{ order: [['event_name','DESC']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}
/*
exports.eventcreate = function (req, res, next){
if (req.session.loggedIn !== true || req.session.Group.roles < 1){
    res.render("NoPermission")
    return
}
Sequelize
.sync(/*{force:true}*//*)
.then((result) => {
    //dato skal være: (år-måned-dag):
    Events.create({ 
            group_id: req.session.Group.id, //<= skal være samme gruppe som er logget ind
            event_name: req.body.event_name,
            lokation: req.body.event_lokation,
            tid: req.body.event_tid,
            dato: req.body.event_dato,
            pris: req.body.event_pris,
            fburl: req.body.event_fburl});
                    
    console.log(result);
})
// catch error
.catch ((err) => {
    console.log(err);
});
}*/

exports.eventdelete = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 1){
        res.send("You do not have permission to do this")
        return
    }
     Events.destroy({
        //slet ud fra id
        where: {id: req.body.id}
    });
}

exports.eventupdate = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 1){
        res.send("You do not have permission to do this")
        return
    }
    Events.update(
        // Values to update
        {
            event_name: req.body.event_name,
            lokation: req.body.event_lokation,
            tid: req.body.event_tid,
            dato: req.body.event_dato,
            pris: req.body.event_pris,
            fburl: req.body.event_fburl
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

//event info display
exports.eventinfo = function(req, res, next){
    return Events.findAll({ order: [['name'],['tid']]})
        .then(function(data) {
            res.redirect('eventinfo', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

// se createvent
exports.createevent = (req, res, next) => {
    res.render("createevent")
}

// opret event
exports.createevents = (req, res, next) => {
    Events.create({
        group_id : req.session.Group.id,
        event_name: req.body.event_name,
        beskrivelse: req.body.beskrivelse,
        lokation: req.body.lokation,
        tid: req.body.tid,
        dato: req.body.dato,
        pris: req.body.pris,
        fburl: req.body.fburl

    }).then(function (event) {
        if (event) {
            res.redirect('/grouppanel');
        } else {
            response.status(400).send('Error in insert new event');
        }
    });
}
