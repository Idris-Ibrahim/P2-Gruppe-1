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
    //tjekker for om pris er Null og sætter den til 0 hvis ja
    var pris = req.body.pris

    if (pris.length == 0){
        pris = 0;
    
    }else{
        pris = req.body.pris
    }
    //laver en event med givne data indsat i vores forms
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
            //hvis eventen blev kreeret uden fejl bliver brugeren sendt
            //tilbage til grouppanelet
            res.redirect('/grouppanel');
        } else {
            response.status(400).send('Error in insert new event');
        }
    });
}

exports.findOne = (req, res) => {
    //finder id for eventet og gemmer det i idcheck
    const idcheck = req.query.id
    //finder den event der er blevet valgt ud fra id'et
    Events.findAll({where: {'id' : { [Op.eq]: idcheck} }})

    .then(function(data) {
        //render eventinfo.pug med informationer om den givne event
        res.render('eventinfo', {eventlist: data },
        console.log(data));
    })
    .catch( function(err)  {
        console.log(err)
    });
};
// events delete for admin
exports.eventsdelete = function(req, res, next){
    //chekker om brugeren i session er admin
    if (req.session.loggedIn !== true || req.session.Group.roles < 2){
        res.render("nopugmission")
        return
    }
    //gemmer vores id i idcheck
    const idcheck = req.query.id
    return Events.destroy({
        //slet ud fra id
        where: {'id' : { [Op.eq]: idcheck} }
    }).then(function (event) {
        if (event) {
            //redirecter tilbahe til admin/events
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
    //gemmer det valgte id i idcheck
    const idcheck = req.body.id
    //chekker om brugeren er admin
    if (req.session.loggedIn !== true || req.session.Group.roles < 2) {
        res.render("nopugmission")
        return
    }

    Events.update(
        // Values to update (id erstattes med det samme id)
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
        {   //opdatere ud fra valgte id
            where: {'id': {[Op.eq]: idcheck} }
        }
    ).then(function (groups) {
        if (groups) {
            //redirecter til admins/events
            res.redirect('/admin/events');
        } else {
            response.status(400).send('Error in update');
        }
    });
}

// viser update event page for grouppanel
exports.updateeventsgroup = (req, res, next) => {
    //gemmer event id'et i idcheck
    const idcheck = req.query.id
    //finder den event med samme id
    Events.findAll({where: {'id': {[Op.eq]: idcheck}}})
        .then(function (data) {
            //render den info ud til grouppanelupdate.pug
            res.render('grouppanelupdate', {eventlist: data},
                console.log(data));

        })
}

// opdater event for grouppanel
exports.eventsupdategroup = function (req, res, next) {
    //gemmer det valgte id i idcheck
    const idcheck = req.body.id
    //chekker om gruppen der er i session har role 1 eller over
    if (req.session.loggedIn !== true || req.session.Group.roles < 1) {
        res.render("nopugmission")
        return
    }
    //hvis pris er null sættes pris til : 0
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
        { //opdatere eventen der har det samme id som vores idcheck
            where:{
            [Op.and]: [ 
            {id: {[Op.eq]: idcheck}},
            //checker om den gruppe der skal opdateres tilhører
            //den gruppe som er i session
            {group_id: req.session.Group.id}
        ]}}
    ).then(function (groups) {
        if (groups) {
            //redirecter til grouppanel.pug
            res.redirect('/grouppanel');
        } else {
            response.status(400).send('Error in update');
        }
    });
}

// event delete for group
exports.eventsdeletegroup = function(req, res, next){
    //chekker om gruppen i session har role 1 eller over
    if (req.session.loggedIn !== true || req.session.Group.roles < 1){
        res.render("nopugmission")
        return
    }
    //gemmer id'et i idcheck
    const idcheck = req.query.id
        Events.destroy({ where:{ 
            //slet ud fra id
            [Op.and]: [
            { id : { [Op.eq]: idcheck}},
            //checker om den gruppe der skal slettes tilhører
            //den gruppe som er i session
            { group_id: req.session.Group.id}]
            }
        }).then(function (event) {
            if (event) {
                //redirecter til grouppanel.pug
                res.redirect('/grouppanel');
            } else {
                res.status(400).send('Error in delete');
            }
        });
 
}