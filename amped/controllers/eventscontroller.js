const Sequelize = require("sequelize");
const {Op} = Sequelize;
const Events = require("../models/events");
const { response } = require("express");

//datetime of the current date for referencing:
let today = new Date()
let today1 = new Date()
today1.setDate(today.getDate() - 1);

// all events sorted by date and time without the
exports.viewevents =  function (req, res, next) {
//finder alle events sorteret efter tid og dato hvor at dato ikke må være
//mindre end dagens dato
    Events.findAll(
        {order: [['dato', 'ASC'],['tid', 'ASC']],
            where: {'dato' :{ [Op.gt]: today1}}})

    .then(function(data) {
        //render dataen ud til events.pug
            res.render('events', {eventlist: data},
            console.log(data))
    })
        //catching errors
        .catch( function(err)  {
            console.log(err)
        });
    
    }    

exports.vieweventsforgroup =  function (req, res, next) {
    //checker om roles er min 1.
    if (req.session.loggedIn !== true || req.session.Group.roles < 1){
        //hvis ikke så render vi nopugmission.pug for at fortælle brugeren
        //at de ikke har tilladelse til adgang
        res.render("nopugmission")
        return
    }
    //finder alle events som har samme group id som den gruppe der er i session.
    return Events.findAll({where: {group_id : req.session.Group.id},
        //sortere efter dato og tid
        order: [['dato', 'ASC'],['tid', 'ASC']]})
        .then(function(data) {
            //render dataen ud til grouppanel.pug
            res.render('grouppanel', {yourevent: data },
            console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
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
    var pris = req.body.pris
    if (pris.length == 0){
        pris = 0;
    
    }else{
        pris = req.body.pris
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
            pris: pris,
            fburl: req.body.fburl,
        },
        {
            where:{
            [Op.and]: [ 
            {id: {[Op.eq]: idcheck}},
            {group_id: req.session.Group.id}
        ]}}
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
        Events.destroy({ where:{ 
            //slet ud fra id og hvor group_id er det samme som det id der er i session
            [Op.and]: [
            { id : { [Op.eq]: idcheck}},
            { group_id: req.session.Group.id}]
            }
        }).then(function (event) {
            if (event) {
                res.redirect('/grouppanel');
            } else {
                res.status(400).send('Error in delete');
            }
        });
 
}