const Sequelize = require("sequelize");
const Events = require("../models/events");
const Groups = require("../models/groups");

// all events sorted by date and time
exports.adminpage = (req, res) => {
    //tjekker om en bruger er i session og om den bruger har roles: 2 (er admin)
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.render("nopugmission")
        return
    }
    //hvis ja så får brugeren adgang til adminpanelene
    res.render("admin")

}

exports.viewevents = (req, res, next) => {
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        //tjekker om en bruger er i session og om den bruger har roles: 2 (er admin)
        res.render("nopugmission")
        return
    }
    //finder alle Events sorteret efter dato og tid og render det til adminevents.pug
    return Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('adminevents', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}

exports.viewgroups = (req, res, next) => {
    //tjekker om en bruger er i session og om den bruger har roles: 2 (er admin)
    if (req.session.loggedIn !== true || req.session.Group.roles !== 2){
        res.render("nopugmission")
        return
    }
    return Groups.findAll()
    //finder alle groups og render dem til admingroups.pug
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

// viser update page
exports.updateadmin = (req, res, next) => {
    res.render("adminupdate")
}

// viser update gruppe form
exports.adminupdategroups = function(req, res, next) {
    //tjekker om en bruger er i session og om den bruger har roles: 2 (er admin)
    if (req.session.loggedIn !== true || req.session.Group.roles < 2){
        res.send("You do not have permission to do this")
        return
    }
    //hvis ja kan admin opdatere gruppen
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