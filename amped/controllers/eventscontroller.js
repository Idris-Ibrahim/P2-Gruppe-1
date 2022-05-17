const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
const { grouproleone } = require("./groupscontroller");
const Groups = require("../models/groups");
const async = require('async');
const { response } = require("express");

//datetime of the current date for referencing:
let today = new Date()
let today1 = new Date()
today1.setDate(today.getDate() - 1);

// string variables for data manipulation:
var findgroups 
var findevents 
// all events sorted by date and time without the
exports.viewevents =  function (req, res, next) {
    
    console.log(req.session)

    Events.findAll(
        {order: [['dato', 'ASC'],['tid', 'ASC']],
            where: {'dato' :{ [Op.gt]: today1}}})

    .then(function(data) {
            res.render('events', {eventlist: data},
            console.log(data))
    })

        .catch( function(err)  {
            console.log(err)
        });
    
    }    
/*
        Events.findAll(
            {order: [['dato', 'ASC'],['tid', 'ASC']],
                where: {'dato' :{ [Op.gt]: today1}}})

        .then(function(data){
            findevents = data
            console.log('events:', findevents)
        })
            Groups.findAll()
   

        .then(function(data){
            findgroups = data
        })

        .then(function(findevents, findgroups){
            console.log('groups:', findgroups, 'events:', findevents)
            res.render('events', {eventlist: findevents, eventlist: findgroups})
        })

}
*/

exports.vieweventsforgroup =  function (req, res, next) {
    if (req.session.loggedIn !== true || req.session.Group.roles <= 0){
        res.render("nopugmission")
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
    return Events.findAll({include: {model: Groups, as: 'group_name'}},{ order: [['event_name','DESC']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

exports.eventdelete = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 1){
        res.send("You do not have permission to do this")
        return
    }
    const idcheck = req.query.id
    console.log(idcheck)
    return Events.destroy({
        //slet ud fra id
        where: {'id' : { [Op.eq]: idcheck} }
    }).then(function (events) {
        if (events) {
            res.redirect('/grouppanel/delete');
        } else {
            response.status(400).send('Error in delete');
        }
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
    var pris = req.body.pris

    if (pris.length == 0){
        pris = 0;
    
    }else{
        pris = req.body.pris
    }

    Events.create({
        group_id : req.session.Group.id,
        event_name: req.body.event_name,
        beskrivelse: req.body.beskrivelse,
        lokation: req.body.lokation,
        tid: req.body.tid,
        dato: req.body.dato,
        pris: pris,
        fburl: req.body.fburl

    

    }).then(function (event) {
        if (event) {
            res.redirect('/grouppanel');
        } else {
            response.status(400).send('Error in insert new event');
        }
    });
}
exports.findOne = (req, res) => {
    const idcheck = req.query.id
    console.log(idcheck)
    Events.findAll({where: {'id' : { [Op.eq]: idcheck} }})

    .then(function(data) {
        res.render('eventinfo', {eventlist: data },
        console.log(data));
    })
    .catch( function(err)  {
        console.log(err)
    });
};
// events delete for admin
exports.eventsdelete = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 2){
        res.render("nopugmission")
        return
    }
    const idcheck = req.query.id
    console.log(idcheck)
    return Events.destroy({
        //slet ud fra id
        where: {'id' : { [Op.eq]: idcheck} }
    }).then(function (event) {
        if (event) {
            res.redirect('/admin/events');
        } else {
            res.status(400).send('Error in delete');
        }
    });
}

// viser update event page for adminevent
exports.updateeventsadmin = (req, res, next) => {
    const idcheck = req.query.id
    console.log(idcheck)
    Events.findAll({where: {'id': {[Op.eq]: idcheck}}})
        .then(function (data) {
            res.render('adminupdateevent', {eventlist: data},
                console.log(data));

        })
}
// opdater event for admin event
exports.eventsupdate = function (req, res, next) {
    const idcheck = req.body.id
    console.log(idcheck)
    if (req.session.loggedIn !== true || req.session.Group.roles < 2) {
        res.render("nopugmission")
        return
    }

    Events.update(
        // Values to update
        {
            id:idcheck,
            event_name: req.body.event_name,
            beskrivelse: req.body.beskrivelse,
            lokation: req.body.lokation,
            tid: req.body.tid,
            dato: req.body.dato,
            pris: req.body.pris,
            fburl: req.body.fburl,
        },
        {
            where: {'id': {[Op.eq]: idcheck} }
        }
    ).then(function (groups) {
        if (groups) {
            res.redirect('/admin/events');
        } else {
            response.status(400).send('Error in update');
        }
    });
}

// viser update event page for grouppanel
exports.updateeventsgroup = (req, res, next) => {
    const idcheck = req.query.id
    console.log(idcheck)
    Events.findAll({where: {'id': {[Op.eq]: idcheck}}})
        .then(function (data) {
            res.render('grouppanelupdate', {eventlist: data},
                console.log(data));

        })
}

// opdater event for grouppanel
exports.eventsupdategroup = function (req, res, next) {
    const idcheck = req.body.id
    console.log(idcheck)
    if (req.session.loggedIn !== true || req.session.Group.roles < 1) {
        res.render("nopugmission")
        return
    }

    Events.update(
        // Values to update
        {
            id:idcheck,
            event_name: req.body.event_name,
            beskrivelse: req.body.beskrivelse,
            lokation: req.body.lokation,
            tid: req.body.tid,
            dato: req.body.dato,
            pris: req.body.pris,
            fburl: req.body.fburl,
        },
        {
            where: {'id': {[Op.eq]: idcheck} }
        }
    ).then(function (groups) {
        if (groups) {
            res.redirect('/grouppanel');
        } else {
            response.status(400).send('Error in update');
        }
    });
}

// event delete for group
exports.eventsdeletegroup = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 1){
        res.render("nopugmission")
        return
    }
    const idcheck = req.query.id
    console.log(idcheck)
    return Events.destroy({
        //slet ud fra id
        where: {'id' : { [Op.eq]: idcheck} }
    }).then(function (event) {
        if (event) {
            res.redirect('/grouppanel');
        } else {
            res.status(400).send('Error in delete');
        }
    });
}