const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
const Groups = require("../models/groups");

// all events sorted by date and time

exports.adminpage = (req, res) => {
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.send("You're not an admin")
        return
    }
    res.render("admin")

}

exports.viewevents = (req, res, next) => {
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.send("You're not an admin")
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
        res.send("You're not an admin")
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
// viser opret-gruppe page
exports.registeradmin = (req, res, next) => {
    res.render("adminopret")
}

//viser opret gruppe form
exports.adminregistergroups = (req, res, next) => {
    Groups.create({
        group_name: req.body.group_name,
        group_email: req.body.group_email,
        password: req.body.password,
        group_about: req.body.group_about,
        fburl: req.body.fburl,
        roles: req.body.roles
    }).then(function (groups) {
        if (groups) {
            res.redirect('/admingroups');
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
}

// viser update page
exports.updateadmin = (req, res, next) => {
    res.render("adminupdate")
}

// viser update gruppe form
exports.adminupdategroups = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 2){
        res.send("You do not have permission to do this")
        return
    }
    Groups.update(
        // Values to update
        {
            group_name: req.body.group_name,
            group_email: req.body.group_email,
            password: req.body.password,
            group_about: req.body.group_about,
            fburl: req.body.fburl,
            roles: req.body.roles
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