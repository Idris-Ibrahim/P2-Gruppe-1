const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups");
const Events = require("../models/events");

// se alle groups
exports.viewgroups = (req, res, next) => {
    return Groups.findAll()
        .then((data) => {
            res.render('groups', {grouplist: data },
            console.log(data));
        })
        .catch((err) => {
            console.log(err)
        });
}

//justering af group status til at kunne lave events:
exports.grouproleone = function(req, res, next){

    Groups.update(
        // Values to update
        {
            roles : 1
        },
        //what group to update
        {
            where: {id: req.body.id}
        },
        console.log(result))
        //catching error
    .catch ((err) => {
        console.log(err);
    });
}


// slet grupper

exports.groupsdelete = function(req, res, next){
    return Groups.destroy({
        //slet ud fra id
        where: {id: req.body.id}
    }).then(function (groups) {
        if (groups) {
            res.redirect('/admin/groups');
        } else {
            response.status(400).send('Error in delete');
        }
    });
}

// Update event
exports.groupspdate = function(req, res, next){

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

//
exports.groupinfo = function(req, res, next){
        const idgroupcheck = req.query.id
        console.log(idgroupcheck)
        Groups.findAll({where: {'id' : { [Op.eq]: idgroupcheck} }})
    
        .then(function(data) {
            res.render('groupinfo', {grouplist: data },
            console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
        });
}
