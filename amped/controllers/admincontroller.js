const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
const Groups = require("../models/groups");

// all events sorted by date and time

exports.adminpage = (req, res) => {
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.render("NoPermission")
        return
    }
    res.render("admin")

}

exports.viewevents = (req, res, next) => {
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.render("NoPermission")
        return
    }
    return Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('adminevents', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

exports.viewgroups = (req, res, next) => {
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.render("NoPermission")
        return
    }
    return Groups.findAll()
        .then((data) => {
            res.render('admingroups', {grouplist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}
